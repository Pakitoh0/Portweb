---
title: How I built omatab
date: 2026-11-21
summary: An Android tablet as a USB second screen for Hyprland, at 17 ms latency and 12 % of one core. What I had to measure, patch and debug to get there.
tags: [Rust, GStreamer, Kotlin, Hyprland, Bash]
draft: true
---

I wanted to use my Galaxy Tab as an extended monitor for my laptop. The options I found went over Wi-Fi, with latency you could feel when moving the mouse, or did not integrate with Hyprland. I set three requirements: **over a cable**, **smooth** and **without loading the laptop**.

## The architecture

I did not start from scratch. [Moreland](https://github.com/adiimanav/moreland) already did the hard part: creating a virtual monitor in Hyprland, capturing it and hardware-encoding it to H.264. omatab is everything around it that turns it into a one-click Omarchy plugin.

```text
Hyprland ── virtual monitor (headless)
   │  ext-image-copy-capture (DMA-BUF, zero-copy)
   ▼
Engine ── GStreamer VA-API → H.264 ── adb forward (USB) ──▶ Android app (MediaCodec)
   ▲                                                          │
   └──────────────────── ack for every frame ◀────────────────┘
```

- **Engine** in Rust (a Moreland fork with my own patches).
- **Android app** in Kotlin that decodes and draws the video, with a standby screen.
- **Controller** in Bash + jq with verbs (`start`, `stop`, `doctor`, `set`…).
- **Widget** in the Omarchy bar, built with QML, with a settings panel.

## First wall: not a single byte on Intel

On my laptop (Intel, iHD driver) the engine created the monitor but sent nothing. The error was `not-negotiated` on the first frame.

The cause: the driver does not advertise the `XR24` format on `vapostproc`'s input, only `AR24` and others. The code looked up modifiers for XR24 only, fell back to a linear one and negotiated something the driver rejected. It works on AMD, which is why nobody had seen it.

The fix was to pick the format based on what the driver advertises. AR24 has the same layout as XR24 and the alpha is ignored when converting to NV12. **Lesson:** no format is universal in VA-API; ask the driver before fixing one.

## Measure before optimizing

To choose the encoder and frame rate, I measured 20 seconds of moving video on the tablet. With nothing moving, Hyprland sends ~1 fps and the numbers lie.

| Combination                  | Median       | p95          | Dropped frames |
| ---------------------------- | ------------ | ------------ | -------------- |
| `vah264enc` at 90 fps        | 14–22 ms     | ~30 ms       | ~0.3 %         |
| `vah264enc` at 120 fps       | 13 ms        | 27 ms        | 12 %           |
| **`vah264lpenc` at 120 fps** | **16–18 ms** | **21–28 ms** | **~0.1 %**     |

The lowest median dropped 12 % of frames, which shows up as stutter. I went with the low-power encoder (VDEnc): it is fixed-function hardware, barely touches the GPU, and the engine stays at 12–15 % of one core.

## The frame the decoder kept to itself

When only the mouse moved, the cursor "took a while to show up". In the stats, N−1 out of N frames were always acknowledged. Two things were holding a frame back:

1. **On the laptop**, packets were sent after the next capture, which waits for something to change on screen.
2. **On the tablet**, the Exynos decoder does not output the latest frame until another one arrives, and it ignores the low-latency options.

I fixed it by sending each packet as soon as it leaves the encoder and, after two idle frame intervals, re-encoding the last frame once: an almost empty P-frame that pushes the held one out. The cursor went from 38 to 21 ms median.

## Unplugging without hanging

When the cable came out, the virtual monitor stayed for 5–7 seconds, or forever if nothing changed on screen. The main thread was blocked waiting for a capture that would never arrive.

Now a shared flag marks the disconnection, and the capture wait uses `poll` with a 100 ms timeout that checks it on every loop. The disconnect is detected in ~0.3 s, even before udev. Plugging back in and getting a picture went from 5–10 s to about 3 s.

## Shipping it properly

`omarchy plugin add` only clones the repo, so the engine binary and the APK ship in a release with their `SHA256SUMS`, and `omatab install` checks them before installing anything. No `sudo`: if a package is missing, it tells you which one. When building the binary I stripped my machine's paths with `--remap-path-prefix`: the first build carried 99 paths with my username in them.

## Takeaways

- **Measure with real content**: static and moving, median and p95, not just the average.
- **Every blocking loop must be able to wake up** if the other end goes away.
- **Assume nothing about the hardware**: ask the driver what it supports.
- **A verifiable release** beats asking people to compile.

The code is at [github.com/Pakitoh0/omatab](https://github.com/Pakitoh0/omatab).

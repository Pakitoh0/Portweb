---
title: The 9-module pipeline behind this site
date: 2026-11-21
summary: How I deploy this portfolio without fear of breaking it. Nine parallel checks, a local safety net and a deployment that never leaves the site down.
tags: [GitHub Actions, CI/CD, Playwright, Security]
draft: true
---

This site is small and static, but I use it to practice how I would like any project to be deployed. There is one rule: **if anything fails, nothing is published and the last good version stays online**.

## The nine modules

Every push to `main` starts nine parallel jobs on GitHub Actions:

| Module       | What it checks                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| Guardian     | Files that must never be committed (keys, `.env`, dumps, builds) and that nobody weakens the protections |
| Quality      | Prettier formatting, `astro check` types and WCAG AA contrast for all 12 themes                          |
| Workflows    | Workflow errors (actionlint) and workflow security (zizmor)                                              |
| Secrets      | Leaked credentials across the whole git history (gitleaks)                                               |
| Dependencies | Known vulnerabilities with `pnpm audit`                                                                  |
| CodeQL       | Static security analysis of the code                                                                     |
| Build        | Build, broken internal links, valid HTML and a weight budget                                             |
| Lighthouse   | Performance ≥ 90, accessibility ≥ 95, best practices ≥ 90 and SEO ≥ 90                                   |
| E2E          | Playwright tests on the real build, desktop and mobile, plus visual regression                           |

Only when **all nine** pass does a final job package the site and deploy it to GitHub Pages.

## After deploying

- **Signed build provenance** (SLSA): anyone can check with `gh attestation verify` that a published file came from this repo and this workflow.
- **Smoke test**: a few seconds later, the site and the 404 page must respond with the expected content.
- **Monitor** every 6 hours: if the live site fails, it opens an issue and closes it once it recovers.

## Hardening the workflows themselves

A pipeline is code too, and it can be attacked:

- **Least privilege**: the workflow starts with `permissions: {}` and each job asks only for what it needs.
- **Actions pinned by SHA**, not by tag: a tag can move, a SHA cannot.
- **zizmor** scans the workflows for injections and bad practices.

## Maintenance mode

If something goes wrong in production and I need time to fix it, there is a switch: _Run workflow → maintenance_. It publishes a standalone page without going through the build, so the fix can be done calmly.

## The local safety net

Waiting for CI to find a formatting error is wasted time. With lefthook:

- **Before every commit**: guardian, formatting of the changed files and gitleaks.
- **Before every push**: formatting, types, themes, guardian, build, links, HTML and weight, in sequence. If anything fails, the push is cancelled.

E2E tests and Lighthouse stay in CI, because screenshots and measurements are only reliable in the same environment every time.

## A protected but agile `main`

`main` requires the nine checks and a PR from anyone but me. As the admin, I can push directly; GitHub records it, and the pipeline still checks every change before publishing it. Force pushes and deleting the branch are blocked.

## Takeaways

- **A failure must never take production down**: keep "check" and "publish" separate.
- **Whatever is not checked automatically eventually breaks**: links, weight, contrast, the list of projects in the tests…
- **Move checks as close as possible to whoever writes the code** to save CI cycles.

The full workflow is at [github.com/Pakitoh0/Portweb](https://github.com/Pakitoh0/Portweb).

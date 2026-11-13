// Tests end-to-end sobre el build real (dist/), servido como en GitHub Pages
import { defineConfig, devices } from '@playwright/test';

const PORT = 4322;

// En local se puede usar el Chromium del sistema: CHROME_PATH=/usr/bin/chromium pnpm test:e2e
const executablePath = process.env.CHROME_PATH || undefined;

export default defineConfig({
  testDir: '../tests/e2e',
  outputDir: '../test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORT}/Portweb/`,
    trace: 'retain-on-failure',
    launchOptions: { executablePath },
  },
  projects: [
    {
      name: 'escritorio',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    { name: 'movil', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `node tools/serve.mjs ${PORT}`,
    cwd: '..',
    url: `http://127.0.0.1:${PORT}/Portweb/`,
    reuseExistingServer: !process.env.CI,
  },
});

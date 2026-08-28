import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:4012",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "desktop-firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "desktop-webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile-android-chromium", use: { ...devices["Pixel 7"] } },
    { name: "mobile-ios-webkit", use: { ...devices["iPhone 15"] } },
  ],
  webServer: {
    command: "next start --hostname 127.0.0.1 --port 4012",
    url: "http://127.0.0.1:4012",
    reuseExistingServer: false,
    timeout: 30_000,
  },
});

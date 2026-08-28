const verification = {
  schemaVersion: 1,
  id: "brick-website",
  kind: "public-product-website",
  browserSupport: {
    query: "baseline 2023 with downstream",
    portableEngines: ["chromium", "firefox", "webkit"],
  },
  commands: {
    focused: "check:focused",
    repository: "check:repository",
    release: "test:all",
    processCheck: "test:processes",
    contract: "verify:repository-contract",
  },
  servers: [
    {
      name: "website",
      developmentPort: 3012,
      testPort: 4012,
      configurationFiles: ["package.json", "next.config.ts", "verification.config.mjs"],
      strictPort: true,
    },
  ],
  browserConfigs: ["playwright.config.ts"],
  workflows: { ci: ".github/workflows/ci.yml" },
  impact: {
    strategy: "conservative-repository",
    focusedPaths: ["app", "content", "public", "scripts", "tests"],
    conservativePaths: ["package.json", "package-lock.json", "next.config.ts", "tsconfig.json"],
  },
  manual: ["physical mobile browsers", "light and dark appearance", "human responsive and accessibility judgment"],
};

export default verification;

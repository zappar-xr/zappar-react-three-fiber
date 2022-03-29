module.exports = {
  launch: {
    dumpio: true,
    product: "chrome",
    headless: "false",
    defaultViewport: {
      width: 320,
      height: 600,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    },
    args: ["--ignore-certificate-errors"],
  },
  browserContext: "default",
  server: {
    command: "npm run start",
    port: 8082,
    launchTimeout: 60000 * 5,
  },
};

module.exports = {
    launch: {
      dumpio: true,
      headless: 'false',
      defaultViewport: {
          width: 320,
          height: 600,
          deviceScaleFactor: 2,
          isMobile: true,
          hasTouch: true
      },
      args: [
        '--ignore-certificate-errors',
      ]
    },
    browser: 'chromium',
    browserContext: 'default',
    server: {
        command: 'npm run tests',
        port: 8080,
        launchTimeout: 60000
    }
}

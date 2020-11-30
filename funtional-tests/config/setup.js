const  {openBrowser, closeBrowser, setConfig} = require('taiko');

before(async () => {
    await openBrowser({ headless: false });
});

after(async () => {
  await closeBrowser();
});

 beforeEach(async () => {
  setConfig({ retryInterval: 100, retryTimeout: 30000, ignoreSSLErrors: true });
});


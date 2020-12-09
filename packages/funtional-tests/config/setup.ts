import  {openBrowser, closeBrowser, setConfig}  from 'taiko';

beforeEach(async () => {
    await openBrowser({ headless: false });
});

afterEach(async () => {
  await closeBrowser();
});

// beforeEach(async () => {
//   setConfig({ retryInterval: 100, retryTimeout: 30000, ignoreSSLErrors: true });
// });


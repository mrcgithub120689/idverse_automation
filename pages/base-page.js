class BasePage {
  async waitForPageLoad() {
    await browser.waitUntil(
      async () => (await browser.execute(() => document.readyState)) === 'complete',
      {
        timeout: 10000,
        timeoutMsg: 'Page did not load in time',
      }
    );
  }

  async validateUrl(partialUrl) {
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.include(partialUrl);
  }
}

export default BasePage;
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

  async switchToNewWindow() {
      const windowHandles = await browser.getWindowHandles();
      if (windowHandles.length < 2) {
          throw new Error("No new window found to switch to.");
      }
      await browser.switchToWindow(windowHandles[1]);
  }

  async switchToOriginalWindow() {
    const windowHandles = await browser.getWindowHandles();
    if (windowHandles.length < 1) {
        throw new Error("No window handle found to switch back to.");
    }
    await browser.switchToWindow(windowHandles[0]);
  }

  async validateUrlContains(partialText, timeout = 10000) {
    await browser.waitUntil(
        async () => {
            const currentUrl = await browser.getUrl();
            return currentUrl.includes(partialText);
        },
        {
            timeout,
            timeoutMsg: async () => {
                const currentUrl = await browser.getUrl();
                return `Expected URL to include "${partialText}", but got "${currentUrl}" after ${timeout / 1000}s.`;
            }
        }
    );
  }
}

export default BasePage;
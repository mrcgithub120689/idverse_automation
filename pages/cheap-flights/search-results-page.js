import BasePage from "../base-page";
import { expect } from 'chai';

class SearchResultsPage extends BasePage {

    get searchResults() {
        return $$(`//*[contains(@class,'result-item-container')]`);
    }

    async getSearchResults(timeout = 20000, interval = 1000) {
        await browser.waitUntil(async () => {
            const results = await this.searchResults;
            return results.length > 0;
        }, {
            timeout,
            interval,
            timeoutMsg: 'Flight results did not load within the specified timeout.'
        });

        return this.searchResults;
    }
}

export default new SearchResultsPage();
import BasePage from "../base-page";
import { expect } from 'chai';

class SearchResultsPage extends BasePage {

    get searchResults() {
        return $$(`//*[contains(@class,'result-item-container')]`);
    }

    async validateUrl() {
        const currentUrl = await browser.getUrl();
        expect(currentUrl).to.include('flight-search');
    }

    async getSearchResults(maxAttempts = 20, interval = 1000) {
         let flightResults = await this.searchResults;

        for (let i = 0; i < maxAttempts; i++) {
            if (flightResults.length > 0) {
                return flightResults;
            }
            await browser.pause(interval);
            flightResults = await this.searchResults;
        }
    throw new Error(`Flight results did not load after ${maxAttempts} attempts.`);
    }
}

export default new SearchResultsPage();
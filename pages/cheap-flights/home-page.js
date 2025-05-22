import BasePage from "../base-page";

class HomePage extends BasePage {

  get logo() {
    return $(`//span[@class='gPDR-logo-image']`);
  }

  get btnSignIn() {
    return $(`//*[.='Sign in']/parent::*[@role='button']`);
  }

  get listDestination() {
    return $(`(//*[@role='list'])[1]`);
  }

  get inputDestinationFrom() {
    return $(`//input[@placeholder='From?']`);
  }

  get inputDestinationTo() {
    return $(`//input[@placeholder='To?']`);
  }

  get listDestinationDropdown() {
    return $(`//*[contains(@class,'layer-dropdown')]`);
  }

  get btnDepartureDate() {
    return $(`//*[@role='button' and @aria-label='Departure date']`);
  }

  get btnReturnDate() {
    return $(`//*[@role='button' and @aria-label='Return date']`);
  }

  get btnSearch() {
    return $(`//button[@aria-label='Search']`);
  }

  get msgNoAirport() {
    return $(`//*[@class='TaO3-title' and .="You didn't select an airport"]`);
  }

  get btnDismiss() {
    return $(`//*[@class='RxNS-button-content' and .='Dismiss']/ancestor::button`);
  }

  
  async open() {
    await browser.url('https://www.cheapflights.com.au/');
    await browser.maximizeWindow();
  }

  async clearDestination() {
    var isDestinationCleared = await this.listDestination.isDisplayed();

    while (isDestinationCleared) {
      await this.listDestination.doubleClick();
      await browser.keys('Backspace');
      await browser.keys('Backspace');
      isDestinationCleared = await this.listDestination.isDisplayed();
    }
  }

  async selectDestinationFrom(from) {
    await this.inputDestinationFrom.click();
    await this.inputDestinationFrom.setValue(from);
    await browser.pause(3000);
    await this.listDestinationDropdown.waitForExist(1000);
    await browser.keys('ArrowDown');
    await browser.keys('Enter');
  }

  async selectDestinationTo(to) {
    await this.inputDestinationTo.click();
    await this.inputDestinationTo.setValue(to);
    await browser.pause(3000);
    await this.listDestinationDropdown.waitForExist(1000);
    await browser.keys('ArrowDown');
    await browser.keys('Enter');
  }

  /**
   * Selects a date element based on a full date string of format: "D Month, YYYY" (e.g. "6 June, 2025").
   * Handles aria-labels containing extra text around the date.
   * @param {string} fullDate - Date string like "6 June, 2025"
   * @returns {Promise<WebdriverIO.Element>} The date element found
   */
  async datePicker(fullDate) {
    // Validate format roughly: expects "D Month, YYYY"
    const dateRegex = /^\d{1,2} \w+, \d{4}$/;
    if (!dateRegex.test(fullDate)) {
      throw new Error(`Invalid date format: "${fullDate}". Expected format: "D Month, YYYY"`);
    }

    // Split day and monthYear parts
    const [day, ...rest] = fullDate.split(' ');
    const monthYear = rest.join(' ');  // e.g. "June, 2025"
    // XPath to find the button with role='button' where aria-label contains the monthYear
    // and day is matched with space boundaries or starts right after a comma (with normalization to handle spaces)
    const xpath = `//*[@role='button' and contains(@aria-label, '${monthYear}') and starts-with(@aria-label,'${day}')]/parent::td`;
    const dateElement = await $(xpath);
    // Wait for the date element to be clickable (adjust timeout as needed)
    await dateElement.waitForClickable({ timeout: 5000 });
    return dateElement;
  }

  // date should have format of D Month, YYYY
  async setDepartureDate(departureDate) {
    await this.btnDepartureDate.click();
    const dateElement = await this.datePicker(departureDate);
    await dateElement.waitForClickable({ timeout: 1000 });
    await dateElement.click();
  }

  // date should have format of D Month, YYYY
  async setReturnDate(returnDate) {
    await this.btnReturnDate.click();
    const dateElement = await this.datePicker(returnDate);
    await dateElement.waitForClickable({ timeout: 1000 });
    await dateElement.click();
  }

  async searchFlightDetails(from, to, departureDate, returnDate) {
      await cheapFlightsHomePage.clearDestination();
      await cheapFlightsHomePage.selectDestination(from, to);
      await cheapFlightsHomePage.setDepartureDate(departureDate);
      await cheapFlightsHomePage.setReturnDate(returnDate);
      await cheapFlightsHomePage.btnSearch.click();
  }

}

export default new HomePage();
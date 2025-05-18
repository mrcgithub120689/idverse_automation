import { expect } from 'chai';
import cheapFlightsHomePage from '../pages/cheap-flights/home-page';
import flightSearchData from '../data/flight-search';
import searchResultsPage from '../pages/cheap-flights/search-results-page';

describe('CheapFlights Tests', () => {
  beforeEach(async () => {
    await cheapFlightsHomePage.open();
    await cheapFlightsHomePage.waitForPageLoad();
    await cheapFlightsHomePage.logo.waitForExist({ timeout: 10000 });
  });

  it('should display logo and signin button', async () => {
    expect(await cheapFlightsHomePage.logo.isDisplayed()).to.be.true;
    expect(await cheapFlightsHomePage.btnSignIn.isDisplayed()).to.be.true;
  });

  it('should assert logo is positioned on the left and signin on the right', async () => {
    const logoLocation = await cheapFlightsHomePage.logo.getLocation(); // { x: ..., y: ... }
    const signInLocation = await cheapFlightsHomePage.btnSignIn.getLocation();
    // Assert logo is on the left
    expect(logoLocation.x).to.be.lessThan(signInLocation.x);
  });

  it('should search for flights - positive', async () => {
    await cheapFlightsHomePage.clearDestination();
    await cheapFlightsHomePage.selectDestinationFrom(flightSearchData.from);
    await cheapFlightsHomePage.selectDestinationTo(flightSearchData.to);
    await cheapFlightsHomePage.setDepartureDate(flightSearchData.departureDate);
    await cheapFlightsHomePage.setReturnDate(flightSearchData.returnDate);
    await cheapFlightsHomePage.btnSearch.click();
    await searchResultsPage.waitForPageLoad();
    await searchResultsPage.validateUrl();
    let flightResults = await searchResultsPage.getSearchResults();
    expect(flightResults.length).to.be.greaterThan(0);
  });

  it('should search for flights - negative', async () => {
    await cheapFlightsHomePage.clearDestination();
    await cheapFlightsHomePage.selectDestinationFrom(flightSearchData.from);
    await cheapFlightsHomePage.btnSearch.click();
    expect(await cheapFlightsHomePage.msgNoAirport.isDisplayed()).to.be.true;
  });
});
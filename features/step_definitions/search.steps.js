const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const {
  clickRandomSite,
  chooseDate,
  chooseHall,
  clickBookButton,
  clickGetTicketButton,
  getTitle,
  checkBookBut,
} = require("../../lib/func.js");

const dateSelectorW = "a:nth-child(2)";
const hallSelectorW = ".movie-seances__time[href='#'][data-seance-id='225']";
const chooseSitePageSelectorW = ".buying__info-title";
const bookBtnSelector = ".acceptin-button";
const getTicketPageSelector = ".ticket__check-title";
const getTitileSelector = ".tichet__check";
const actualTitleText = "ИдёмВКино";

const dateSelectorMM = "a:nth-child(3)";
const hallSelectorMM = ".movie-seances__time[href='#'][data-seance-id='199']";
const chooseSitePageSelectorMM = ".buying__info-title";

let savedBookedSite= ""

setDefaultTimeout(70000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`${string}`, {
    setTimeout: 50000,
  });
});

When(
  "user book tickets for choosen date {string} and hall {string}",
  async function (dateSelectorW, hallSelectorW) {
    await chooseDate(this.page, dateSelectorW);
    await chooseHall(this.page, hallSelectorW);
    savedBookedSite = await clickRandomSite(this.page, chooseSitePageSelectorW);
    await clickBookButton(this.page, bookBtnSelector);
    await clickGetTicketButton(this.page, getTicketPageSelector);
  }
);

Then("user sees the qr code and title {string}", async function (string) {
  const actual = await getTitle(this.page, getTitileSelector);
  const expected = await string;
  expect(actual).contains(expected);
});

When(
  "user book tickets for Mickie-Maus choosen date {string} and hall {string}",
  async function (dateSelectorMM, hallSelectorMM) {
    await chooseDate(this.page, dateSelectorMM);
    await chooseHall(this.page, hallSelectorMM);
    savedBookedSite = await clickRandomSite(
      this.page,
      chooseSitePageSelectorMM
    );
    await clickBookButton(this.page, bookBtnSelector);
    await clickGetTicketButton(this.page, getTicketPageSelector);
  }
);

When(
  "user chose date {string}, hall {string} and doesn't chose sitting site",
  async function (dateSelectorW, hallSelectorW) {
    await chooseDate(this.page, dateSelectorW);
    await chooseHall(this.page, hallSelectorW);
    await this.page.waitForSelector(chooseSitePageSelectorW);
  }
);

Then("user can't click to the 'Забронировать' button", async function () {
  let checking = await checkBookBut(this.page, bookBtnSelector);
  expect(checking).contains("true");
});
const {
  clickRandomSite,
  chooseDate,
  chooseHall,
  clickBookButton,
  clickGetTicketButton,
  getTitle,
  clickBookedSite,
  checkBookBut,
} = require("./lib/func.js");

let page;
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


beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Positive cinema tests", () => {
  beforeEach(async () => {
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });
  
  test(" + Reservation common site for 'Witcher'", async () => {
    await chooseDate(page, dateSelectorW);
    await chooseHall(page, hallSelectorW);
    savedBookedSite = await clickRandomSite(page, chooseSitePageSelectorW);
    await clickBookButton(page, bookBtnSelector);
    await clickGetTicketButton(page, getTicketPageSelector);
    const title = await getTitle(page, getTitileSelector);

    expect(title).toEqual(actualTitleText);
  }, 80000);

  test(" + Reservation beauty site for 'Mickie-Maus'", async () => {
    await chooseDate(page, dateSelectorMM);
    await chooseHall(page, hallSelectorMM);
    await clickRandomSite(page, chooseSitePageSelectorMM);
    await clickBookButton(page, bookBtnSelector);
    await clickGetTicketButton(page, getTicketPageSelector);
    const title = await getTitle(page, getTitileSelector);

    expect(title).toEqual(actualTitleText);
  }, 80000);

  test(" -- Try to book site if don't chose site", async () => {
    await chooseDate(page, dateSelectorW);
    await chooseHall(page, hallSelectorW);
    await page.waitForSelector(chooseSitePageSelectorW);
    let checking = await checkBookBut(page, bookBtnSelector);
    expect(checking).toEqual("true");
  }, 80000);

});


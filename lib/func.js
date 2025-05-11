module.exports = {
  chooseDate: async function (page, selector) {
    try {
      const choseDate = await page.$(selector);
      await choseDate.click();
    } catch {
      throw new Error(`Ошибка в селекторе: ${selector}`);
    }
  },

  chooseHall: async function (page, selector) {
    try {
      const choseHall = await page.$(selector);
      await choseHall.click();
    } catch {
      throw new Error(`Ошибка в селекторе: ${selector}`);
    }
  },

  clickBookButton: async function (page, selector) {
    try {
      const bookBtn = await page.$(selector);
      await bookBtn.click();
    } catch {
      throw new Error(`Ошибка в селекторе: ${selector}`);
    }
  },

  clickGetTicketButton: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      const getTicketBtn = await page.$(".acceptin-button");
      await getTicketBtn.click();
    } catch {
      throw new Error(`Ошибка в селекторе: ${selector}`);
    }
  },

  getTitle: async function (page, selector) {
    try {
      await page.waitForSelector(".tichet__check");
      const title = await page.title();
      return title;
    } catch {
      throw new Error(`Ошибка в селекторе: ${selector}`);
    }
  },

  clickRandomSite: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      const listOfRows = await page.$$(".buying-scheme__row");
      let randomRow = Math.floor(Math.random() * (listOfRows.length - 1)) + 1;
      let randomCol = Math.floor(Math.random() * (listOfRows.length - 1)) + 1;
      let choseSite = await page.$(
        `div:nth-child(${randomRow}) span:nth-child(${randomCol})`
      );
      let className = await page.evaluate((el) => el.className, choseSite);
      while (className.includes("buying-scheme__chair_taken")) {
        randomRow = Math.floor(Math.random() * (listOfRows.length - 1)) + 1;
        randomCol = Math.floor(Math.random() * (listOfRows.length - 1)) + 1;
        choseSite = await page.$(
          `div:nth-child(${randomRow}) span:nth-child(${randomCol})`
        );
        className = await page.evaluate((el) => el.className, choseSite);
      }
      await choseSite.click();
    } catch {
      throw new Error("Ошибка в выборе места");
    }
  },

  clickBookedSite: async function (page, selector, savedLink) {
    try {
      await page.waitForSelector(selector);
      await savedLink.click();
    } catch {
      throw new Error("Ошибка в выборе места");
    }
  },

  checkBookBut: async function (page, selector) {
    try {
      const bookBtn = await page.$(selector);
      let checking = await page.evaluate(
        (el) => el.getAttribute("disabled"), bookBtn);
      return checking;
    } catch {
      throw new Error(`Кнопка бронирования активна`);
    }
  },
};

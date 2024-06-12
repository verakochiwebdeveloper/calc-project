const appData = {
  screenPrice: 0,
  servicePrice1: 0,
  screens: [],
  fullPrice: 0,
  rollback: 0,
  servicePercentPrice: 0,

  adTitle() {
    document.title = projectTitle.textContent;
  },

  getAllServicePrices(price1, price2) {
    while (isNaN(price1) || price1 === "" || price1 === null) {
      price1 = parseFloat(price1);
    }
    while (isNaN(price2) || price2 === "" || price2 === null) {
      price2 = parseFloat(price2);
    }
    return price1 + price2;
  },

  getFullPrice(price1, price2) {
    return price1 + price2;
  },

  isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  getRollbackMessage(fullPrice) {
    if (fullPrice >= 30000) {
      return "Give a 10% discount";
    } else if (fullPrice >= 15000) {
      return "Give a 5% discount";
    } else if (fullPrice >= 0) {
      return "No discount provided";
    } else {
      return "Something went wrong";
    }
  },

  addScreens() {
    let screenBlocks = document.querySelectorAll('.screen');
    let totalScreenCount = 0;

    screenBlocks.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;
      const screenCount = parseInt(input.value);

      if (selectName !== "" && !isNaN(screenCount)) {
        totalScreenCount += screenCount;

        this.screens.push({
          id: index,
          name: selectName,
          price: +select.value * screenCount,
          count: screenCount
        });
      }
    });

    totalCount.textContent = totalScreenCount;
  },

  start() {
    this.addScreens();

    const servicePrices = this.getAllServicePrices(
      parseFloat(this.screenPrice),
      parseFloat(this.servicePrice1)
    );

    this.fullPrice = this.getFullPrice(
      parseFloat(this.screenPrice),
      servicePrices
    );

    this.servicePercentPrice = this.fullPrice - this.rollback;

    this.addPrices();

    this.logger();
  },

  addPrices() {
    const servicePriceWithRollback = this.servicePercentPrice;

    totalRollback.textContent = servicePriceWithRollback;
  },

  reset() {
    
    screenPriceInput.value = "";
    servicePriceInput.value = "";
    
    const screenBlocks = document.querySelectorAll('.screen');
    screenBlocks.forEach(screen => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      select.disabled = false;
      input.disabled = false;

      select.selectedIndex = 0;
      input.value = "";
    });
  }
};

/
resetBtn.style.display = "none";
calculateBtn.style.display = "block";

calculateBtn.addEventListener('click', function() {
  appData.start();
});


rangeInput.addEventListener('input', function() {
  rangeValue.textContent = rangeInput.value;
  appData.rollback = parseInt(rangeInput.value);
});

appData.init();

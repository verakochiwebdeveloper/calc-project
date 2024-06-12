const projectTitle = document.getElementsByTagName('h1')[0];
const  calculateBtn = document.getElementsByClassName('.handler_btn')
const  resetBtn = document.getElementsByClassName('.handler_btn')
const  plusBtn = document.querySelector('.screen-btn')
const  screenBtn = document.querySelectorAll('.screen-btn')
const itemsWithPercent = document.querySelectorAll('.other-items.percent');
const itemsWithNumber = document.querySelectorAll('.other-items.number');
const rangeInput = document.querySelector('.rollback input[type="range"]');
const rangeValue= document.querySelector('.rollback.range-value');
const totalInput = document.getElementsByClassName('total-input');
//не совсем красиво получаеться
const total = document.getElementsByClassName('total-input')[0]; //1-ый input
const totalCount = document.getElementsByClassName('total-input')[1]; //2-ый input
const totalCountOther = document.getElementsByClassName('total-input')[2]; //3-ый input
const totalFullCount = document.getElementsByClassName('total-input')[3]; //4-ый input
const totalRollback = document.getElementsByClassName('total-input')[4]; //5-ый input
let screenBlocks = document.querySelectorAll('.screen');


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
    while (true) {
      if (isNaN(price1) || price1 === "" || price1 === null) {
        price1 = parseFloat(price1);
        break;
      } else {
        alert("Please enter a number.");
      }
    }
    while (true) {
      if (isNaN(price2) || price2 === "" || price2 === null) {
        price2 = parseFloat(price2);
        break;
      } else {
        alert("Please enter a number.");
      }
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
    // this.addServices(); // Метод addServices не определен в данном коде

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
    // Reset to initial state
    // Remove dynamically added elements and reset input values
    // Unlock all input[type=text] and select elements
  }
};

// Convert the project to arrow functions except object methods

// Bind 'this' to appData object where necessary to maintain context

// Disable all input[type=text] and select elements on the left side after Calculate button is clicked
// Replace Calculate button with Reset button

// Implement a reset() method in the object triggered by the Reset button
// The reset() method should revert the object to its initial state

// The Reset button should replace the Calculate button
// All dynamically added elements and input values should be removed
// All input[type=text] and select elements should be unlocked

// Add event listener for range input
rangeInput.addEventListener('input', function() {
  rangeValue.textContent = rangeInput.value;
  appData.rollback = parseInt(rangeInput.value);
});

appData.init();


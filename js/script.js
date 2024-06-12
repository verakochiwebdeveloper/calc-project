const projectTitle = document.getElementsByTagName('h1')[0];
const  calculateBtn = document.querySelector('.handler_btn')
const  resetBtn = document.querySelector('.handler_btn')
const  plusBtn = document.querySelector('.screen-btn')
const  screenBtn = document.querySelectorAll('.screen-btn')
const itemsWithPercent = document.querySelectorAll('.other-items.percent');
const itemsWithNumber = document.querySelectorAll('.other-items.number');
const rangeInput = document.querySelector('.rollback input[type="range"]');
const rangeValue= document.querySelector('.rollback.range-value');
const totalInput = document.getElementsByClassName('total-input');
const total = document.getElementsByClassName('total-input')[0]; 
const totalCount = document.getElementsByClassName('total-input')[1]; 
const totalCountOther = document.getElementsByClassName('total-input')[2]; 
const totalFullCount = document.getElementsByClassName('total-input')[3]; 
const totalRollback = document.getElementsByClassName('total-input')[4]; 
let screenBlocks = document.querySelectorAll('.screen');


const appData = {
    title: "",
    screens: "",
    screenPrice: 0,
    adaptive: true,
    rollback: Math.ceil(Math.random() * 100),
    AllServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: {},
    servicePercentPricent: {},
    servicePercentNumber: {},
    service1: "",
    service2: "",
    init: function () {
      appData.adTitle();

      calculateBtn.addEventListener('click', appData.start);
      screenBtn.addEventListener('click', appData.addScreenBlock);

      appData.start();
    },

    addScreenBlock: function() {
      const cloneScreenBlocks = screenBlocks[0].cloneNode(true);
      screenBlocks[screenBlocks.length -1].appendChild(cloneScreenBlocks)
    },

    adTitle: function () {
      document.title = projectTitle.textContent;
    },
  
  
    getAllServicePrices: function (price1, price2) {
      while (true) {
        if (isNaN(price1) || price1 === "" || price1 === null) {
          price1 = parseFloat(price1);
          break;
        } else {
          alert("Пожалуйста, введите число.");
        }
      }
      while (true) {
        if (isNaN(price2) || price2 === "" || price2 === null) {
          price2 = parseFloat(price2);
          break;
        } else {
          alert("Пожалуйста, введите число.");
        }
      }
      return price1 + price2;
    },
  
    getFullPrice: function (price1, price2) {
      return price1 + price2;
    },
  
    isNumber: function (num) {
      return !isNaN(parseFloat(num)) && isFinite(num);
    },
  
    getRollbackMessage: function (fullPrice) {
      if (fullPrice >= 30000) {
        return "Даем скидку в 10%";
      } else if (fullPrice >= 15000) {
        return "Даем скидку в 5%";
      } else if (fullPrice >= 0) {
        return "Скидка не предусмотрена";
      } else {
        return "что-то пошло не так";
      }
    },

    addScreens: function () {
      let screenBlocks = document.querySelectorAll('.screen');
      let totalScreenCount = 0;

      screenBlocks.forEach(function(screen, index) {
          const select = screen.querySelector('select');
          const input = screen.querySelector('input');
          const selectName = select.options[select.selectedIndex].textContent;
          const screenCount = parseInt(input.value);

          if (selectName !== "" && !isNaN(screenCount)) {
              totalScreenCount += screenCount;

              appData.screens.push({
                  id: index,
                  name: selectName,
                  price: +select.value * screenCount,
                  count: screenCount
              });
          }
      });

      // Display total screen count
      totalCount.textContent = totalScreenCount;
  },

  start: function () {
      this.addScreens();
      this.addServices();

      const servicePrices = this.getAllServicePrices(
          parseFloat(this.screenPrice),
          parseFloat(this.servicePrice1)
      );

      this.fullPrice = this.getFullPrice(
          parseFloat(this.screenPrice),
          servicePrices
      );

      this.servicePercentPrice = this.fullPrice - this.rollback;
      
      // Calculate and display service price with rollback
      this.addPrices();

      this.logger();
  },

  addPrices: function () {
      // Calculate service price with rollback
      const servicePriceWithRollback = this.servicePercentPrice;

      // Display service price with rollback
      totalRollback.textContent = servicePriceWithRollback;
  }
};

// Добавление обработчика события для range input
rangeInput.addEventListener('input', function() {
  rangeValue.textContent = rangeInput.value;
  appData.rollback = parseInt(rangeInput.value);
});

appData.init();



  const start = document.querySelector('.start'),
        budgetValue = document.querySelector('.budget-value'),
        dayBudgetValue = document.querySelector('.daybudget-value'),
        levelValue = document.querySelector('.level-value'),
        expensesValue = document.querySelector('.expenses-value'),
        optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
        incomeValue = document.querySelector('.income-value'),
        monthsavingsValue = document.querySelector('.monthsavings-value'),
        yearsavingsValue = document.querySelector('.yearsavings-value'),
    
        expensesItemBtn = document.querySelector('.expenses-item-btn'),
        expensesItem = document.querySelectorAll('.expenses-item'),
    
        optionalExpensesBtn = document.querySelector('.optionalexpenses-btn'),
        optionalExpensesItem = document.getElementsByClassName('optionalexpenses-item'),
    
        countBudgetBtn = document.querySelector('.count-budget-btn'),
    
        chooseIncome = document.querySelector('.choose-income'),
    
        savings = document.querySelector('#savings'),
        chooseSum = document.querySelector('.choose-sum'),
        choosePercent = document.querySelector('.choose-percent'),
    
        yearValue = document.querySelector('.year-value'),
        monthValue = document.querySelector('.month-value'),
        dayValue = document.querySelector('.day-value');
    
  let money, time;

  let appData = {
    budjet: money,
    InterDate: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
  };

  expensesItemBtn.disabled = true;
  optionalExpensesBtn.disabled = true;
  countBudgetBtn.disabled = true;

  start.addEventListener('click', () => {
    time = prompt('Vvedite datu v formate YYYY-MM-DD', '');
    money = +prompt('Vash budjet na mesyats?', '');

    while (isNaN(money) || money == '' || money == null) {
      money = +prompt('Vash budjet na mesyats?', '');
    }

    appData.budjet = money;
    appData.InterDate = time;
    budgetValue.textContent = money;

    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate() + 1;

    expensesItemBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBudgetBtn.disabled = false;
  });


  expensesItemBtn.addEventListener('click', () => {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
      let a = expensesItem[i].value,
          b = expensesItem[++i].value;

      if ((typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
        appData.expenses[a] + b;
        sum += +b;
      } else {
        alert('Something is wrong!');
        i--;
      }
    }
    expensesValue.textContent = sum;
  });

  optionalExpensesBtn.addEventListener('click', () => {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
      let opt = optionalExpensesItem[i].value;
      appData.optionalExpenses[i] = opt;
      optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
  });

  countBudgetBtn.addEventListener('click', () => {
    if (appData.budjet != undefined) {
      appData.incomePerDay = ((appData.budjet - +expensesValue.textContent) / 30).toFixed();
      dayBudgetValue.textContent = appData.incomePerDay;

      if (appData.incomePerDay <= 100) {
        levelValue.textContent = 'Poor';
      } else if (appData.incomePerDay <= 250) {
        levelValue.textContent = 'it`s ok!';
      } else if (appData.incomePerDay > 250) {
        levelValue.textContent = 'You are rich!';
      } else {
        levelValue.textContent = 'Something is wrong!';
      }
    } else {
      levelValue.textContent = 'Ooops....! Please inter again!';
    }
  });

  chooseIncome.addEventListener('input', () => {
    let iv = chooseIncome.value;
    appData.income = iv.split(',');
    incomeValue.textContent = appData.income;
  });

  savings.addEventListener('click', () => {
    if (appData.savings == false) {
      appData.savings = true;
    } else {
      appData.savings = false;
    }
  });

  chooseSum.addEventListener('input', () => {
    if (appData.savings == true) {
      let chs = chooseSum.value,
        prc = choosePercent.value;

      appData.monthIncome = chs / 100 / 12 * prc;
      appData.yearIncome = chs / 100 * prc;

      monthsavingsValue.textContent = appData.monthIncome;
      yearsavingsValue.textContent = appData.yearIncome;
    }
  });

  choosePercent.addEventListener('input', () => {
    if (appData.savings == true) {
      let chs = chooseSum.value,
          prc = choosePercent.value;

      appData.monthIncome = Math.floor(chs / 100 / 12 * prc);
      appData.yearIncome = Math.floor(chs / 100 * prc);

      monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
      yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
  });

 

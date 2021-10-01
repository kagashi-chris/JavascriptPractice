'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//convert currency base of region
const convertCurrency = function (acc, amount) {
  const currencyOptions = {
    style: 'currency',
    currency: acc.currency,
  };
  const regionCurrency = new Intl.NumberFormat(
    acc.currency,
    currencyOptions
  ).format(amount.toFixed(2));
  return regionCurrency;
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const second = `${time % 60}`.padStart(2, 0);
    const logoutTime = `${min}:${second}`;

    //in each call print remaining time
    labelTimer.textContent = logoutTime;

    if (time === 0) {
      console.log('time = 0');
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };
  //set time to 5 minutes
  let time = 300;

  //call timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;

  //when 0 seconds, stop timer and log user out
};

const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const dateTime = new Date(acc.movementsDates[i]);
    const month = `${dateTime.getMonth() + 1}`.padStart(2, 0);
    const day = `${dateTime.getDate()}`.padStart(2, 0);
    const year = `${dateTime.getFullYear()}`;
    const displayTime = `${month}/${day}/${year}`;

    //convert time difference(current time - time of transaction) into how days passed
    const calcDaysPassed = (date1, date2) =>
      Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

    //display message base on how many days passed
    const dayDisplay = days => {
      if (days < 1) {
        return 'Today';
      } else if (days > 1 && days < 3) {
        return 'Yesterday';
      } else {
        return 'Sometime ago';
      }
    };
    const currentTime = new Date();

    const html = `        
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${dayDisplay(
        calcDaysPassed(currentTime, dateTime)
      )}</div>
      <div class="movements__value">${convertCurrency(
        currentAccount,
        mov
      )}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayDate = function () {
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  labelDate.textContent = Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now);
  // const date = new Date();
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const year = date.getFullYear();
  // const hour = date.getHours();
  // const minute = date.getMinutes();
  // labelDate.textContent = `${month}/${day}/${year}, ${hour}:${minute}`;
};

const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((total, mov) => (total += mov), 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} ${
    currentAccount.currency
  }`;
};

const displaySummary = function (acc) {
  const deposit = acc.movements
    .filter(mov => mov > 0)
    .reduce((total, cur) => (total += cur));
  labelSumIn.textContent = `${deposit.toFixed(2)}`;

  const withdrawal = acc.movements
    .filter(mov => mov < 0)
    .reduce((total, cur) => (total += cur));
  labelSumOut.textContent = `${withdrawal.toFixed(2)}`;

  const interest =
    (acc.movements.reduce((total, cur) => (total += cur)) *
      currentAccount.interestRate) /
    100;
  labelSumInterest.textContent = `${(Math.round(interest * 100) / 100).toFixed(
    2
  )}`;
};

const creatUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

creatUsernames(accounts);

console.log(accounts);

//Event handler
let currentAccount, timer;

//changes the displayed amount of money base on account.
const updateUI = function (currentAccount) {
  //display date
  displayDate();
  //display movements
  displayMovement(currentAccount);
  //display balance
  displayBalance(currentAccount);
  //display summary
  displaySummary(currentAccount);
};

//login button at the top of the screen
btnLogin.addEventListener('click', function (e) {
  //pervent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI and message
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //check if timer is running, if yes then clear timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
  }
});

//button to transfer sum from one account to another
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciever = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    reciever &&
    reciever.username !== currentAccount.username
  ) {
    console.log('Valid Transfer');
    const newDate = new Date().toISOString();
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(newDate);
    reciever.movements.push(amount);
    reciever.movementsDates.push(newDate);
    updateUI(currentAccount);
  }

  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
});

//button to delete account from array
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    //delete account
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';

  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
});

//button to loan out money
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add the movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }

  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
});

//button to sort the display movements
let sortSwitch = true;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovement(currentAccount, sortSwitch);
  if (sortSwitch === true) {
    sortSwitch = false;
  } else {
    sortSwitch = true;
  }

  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
});

console.log(new Date());
//Fake always log in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

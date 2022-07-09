'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements) {

  containerMovements.innerHTML = '';
  // .textContent=0
  movements.forEach(function (mov, i) {

    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      
      <div class="movements__value">${mov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
};
// displayMovements(account1.movements);


//////////////////////////
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
// calcDisplayBalance(account1.movements);
// calcDisplayBalance(accounts);


/////////////////////////
const calcDisplaySummary = function (acc) {//instead of movement use whole account to make interest dynamic for calculation
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  // console.log(out);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements.filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter((mov, i, arr) => { //if value is above 1euro then 
      console.log(arr);
      return mov >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;

};
// calcDisplaySummary(account1.movements);


//////////////////////
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');

  });
};
createUsername(accounts);

//////////******************* */
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent=`Welcome back, ${
      currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    // display movements
    displayMovements(currentAccount.movements);
    // display balance
    // calcDisplayBalance(currentAccount.movements);
    calcDisplayBalance(currentAccount);
    // display summary
    calcDisplaySummary(currentAccount);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    // updateUI(currentAccount);
  }
});
/////////////////////
///// update UI

const updateUi= function(acc){ // function to make easy movements
  // display movements
  displayMovements(acc.movements);
  // display balance
  calcDisplayBalance(currentAccount);
  // display summary
  calcDisplaySummary(currentAccount);
}

////////////////////
//// Transfer amount **********/

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc =accounts.find(acc => acc.userName === inputTransferTo.value);
  console.log(amount , recieverAcc); 

  inputTransferAmount.value = inputTransferTo.value ='';

  if( amount > 0 && recieverAcc && currentAccount.balance >= amount && 
    recieverAcc?.userName !== currentAccount.userName) {
      // console.log('Transfer valid');
      currentAccount.movements.push(-amount);
      recieverAcc.movements.push(amount);

      // update balance and movements, summary
      // display movements
      displayMovements(currentAccount.movements);
      // display balance
      calcDisplayBalance(currentAccount);
      // display summary
      calcDisplaySummary(currentAccount);

      // updateUi(currentAccount);  this one best to call
    }
});

  // console.log(containerMovements.innerHTML);

  //////////////////////////////////
  /////  close accouunt***********

  btnClose.addEventListener('click', function(e) {
    e.preventDefault();

    

    if(inputCloseUsername.value === currentAccount.userName  && Number(inputClosePin.value) === currentAccount.pin){
      
      const index = accounts.findIndex(acc => acc.userName === currentAccount.userName);
      console.log(index);

      accounts.splice(index, 1);

      containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value ='';
  })

  // *****************************************
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  // LECTURES

  // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

  // const eurToUsd = 1.1;
  // const movementUsd = movements.map(function (mov) {
  //   return mov * eurToUsd;
  // })
  // console.log(movements);
  // console.log(movementUsd)

  ///////////////////////

  // const movementUsdFor = [];
  // for (const mov of movements) {
  //   movementUsdFor.push(mov * eurToUsd);
  // }
  // console.log(movementUsdFor);

  // const movementDescription = movements.map(function (mov, i, arr) {

  //   // return `Movement ${i+1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${mov} rs`; // even can do this in one go 

  //   if (mov > 0) {
  //     return `Movement ${i + 1}: You deposited ${mov} rs`
  //   }
  //   else {
  //     return `Movement ${i + 1}: you withdrew ${Math.abs(mov)} rs`
  //   }
  // });
  // console.log(movementDescription);


  // ********************
  // COMPUTING USERNAME ////////
  // *******************

  // TYPE 1. **********
  // const createUsername= function(accs) {
  //   accs.forEach(function(acc){
  //     acc.userName = acc.owner.toLocaleLowerCase().split(' ').map(name => name[0]).join('');

  //   });
  // } ;
  //
  // createUsername(accounts);
  // console.log(accounts);

  // /////******** */
  //  Type 2.
  // const createUsername= function(user) {
  //   const userName = user.toLowerCase().split(' ').map(name=> name[0]).join('');
  //   return userName;
  // };
  // console.log(createUsername('Steven Thomas Williams')) ;

  //  TYPE 3.
  // const user='Steven Thomas Williams';
  // const userName= user.toLocaleLowerCase().split(' ').map(function(name){
  //   return name[0];
  // }).join('');

  // .map(name => name[0]) we can use this one
  // console.log(userName);
  ///////*************** */

  // //////////////************ */
  //  FILTER () ----METHOD

  //  TYPE 1.
  //  const withdrawls=[];
  //  for (const mov of movements) {
  //   if (mov < 0){
  //     withdrawls.push(mov);
  //   }
  //  }
  // console.log(withdrawls);

  // // TYPE 2.
  // const deposits= movements.filter( function(mov){
  //   return mov < 0;
  // });
  // console.log(deposits)
  //////////////////************* */


  //////////////////////////////////////
  // let arr= ['a', 'b', 'c', 'd','e']

  // // slice
  // console.log(arr.slice(2));
  // console.log(arr.slice(2,4));
  // console.log(arr.slice(-2));
  // console.log(arr.slice(-1));
  // console.log(arr.slice(1,-2));
  // console.log(arr.slice());
  // console.log([...arr]);

  // // splice
  // // console.log(arr.splice(3));
  // arr.splice(-1);
  // console.log(arr);
  // arr.splice(1,2);

  // //Reverse
  // arr= ['a', 'b', 'c', 'd','e'];
  // const arr2= ['j','i','h','g','f'];
  // console.log(arr2.reverse());
  // console.log(arr2);

  // //concat

  // const letters= arr.concat(arr2);
  // console.log(letters);
  // console.log([...arr , ...arr2]);

  // //join
  // console.log(letters.join('-'));

  // /////////////////

  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
  // //// For loop
  // // for (const movement of movements){
  //   for ( const [i, movement] of movements.entries()){
  //   if (movement > 0){
  //     console.log(`Movement ${i+1} : You deposited ${movement} rs`)
  //   }
  //   else {
  //     console.log(`Movement ${i+1} :you withdrew ${Math.abs(movement)} rs`)
  //   }
  // };

  /// Foreach
  // console.log('----------------------------')
  // // movements.forEach( function (movement) {
  //   movements.forEach( function( mov, i , arr){
  //   if (mov > 0){
  //     console.log(`You deposited ${mov} rs`)
  //   }
  //   else {
  //     console.log(`you withdrew ${Math.abs(mov)} rs`)
  //   }
  // });

  /// Array with map and set
  // const currencies = new Map([
  //   ['USD', 'United States dollar'],
  //   ['EUR', 'Euro'],
  //   ['GBP', 'Pound sterling'],
  // ]);

  // currencies.forEach( function(value, key , map){
  //   console.log(`${key}: ${value}`);
  // });

  // //set
  // const currenciesUnique = new Set(['USD','GBP','USD','EUR','EUR']);
  // console.log(currenciesUnique);
  // currenciesUnique.forEach(function(value, key, map) {
  //   console.log(`${key}: ${value}`)
  // });


  // ****************************
  ///////////////////////////////
  // *******************************

  // const checkDogAge = function(dogsJulia , dogsKate) {
  //   const dogsJuliaCorrected= dogsJulia.slice();
  //   dogsJuliaCorrected.splice(0,1);
  //   dogsJuliaCorrected.splice(-2);
  //   // dogsJulia.slice(1,3); evn we can  do this
  //   console.log(dogsJuliaCorrected);

  //   const dogs= dogsJuliaCorrected.concat(dogsKate);
  //   console.log(dogs);

  //   dogs.forEach( function( dog ,i){
  //     if (dog >= 3){
  //       console.log(`Dog number ${i+1} is an adult , and is ${dog} years old`);
  //     }
  //     else {
  //       console.log(`Dog number ${i+1} is still a puppy`);
  //     }
  //   })
  //   };

  //   checkDogAge([3,5,2,12,7], [4,1,15,8,3]);
   /////////////////////////
  // const calcAverageHumanAge = function (ages) {
  //   const humanAge = ages.map(function (age) {
  //     if (age <= 2) return 2 * age;
  //     else return 16 + age * 4;
  //   })
  //   // const humanAge= ages.map( age=> (age <= 2 ? 2 * age : 16 + age * 4));
  //   // const adults= humanAge.filter(age => age >= 18);

  //   const adults = [];
  //   for (const i of humanAge) {
  //     if (i > 18) {
  //       adults.push(i);
  //     }
  //   }
  //   console.log(adults);
  //   console.log(humanAge);

  //   //both r usefull
  //   // const average =adults.reduce((acc ,age)=> acc + age ,0)/ adults.length;
  //   const average = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  //   return average;

  // }
  // const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
  // console.log(avg1);
  // const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
  // console.log(avg2);


//////********************// */


/////////////************ */
/// REDUCED METHOD   acc= accumulator
/////////////////////////**********

// TYPE 1.  reduce loop over the array
// console.log(movements);
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`iteration: ${i} = ${acc}`);
//   return acc + cur;
// }, 0); // 2nd parameter as acc initial value
// console.log(balance);

// type2 ---------------
// const balance1 = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance1);

///  MAxIMUM VAKUE  of movements array  ////
// const max = movements.reduce((acc ,mov )=> {
//   if (acc > mov ) return acc ;
//   else return mov;
// }, movements[0]);
// console.log(max);

////************************ */
// MAGIC OF CHAINING METHOD //
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // we can print array using 3rd parameter in below methods..if something went wrong
// const euroToUsd = 1.1;
// const totalDeposit = movements.filter(mov => mov > 0).map(mov => mov * euroToUsd).reduce((acc, mov) => acc + mov, 0);
// console.log(totalDeposit);

// const owners=['jonas','zach','adam','martha'];

console.log(movements);
// ascending
// movements.sort((a,b)=> {
//   if(a > b) return 1;
//   if(a < b) return -1;
// });
movements.sort((a,b)=> a -b )
console.log(movements);

//descending
// movements.sort((a,b) => {
//   if(a > b) return -1;
//   if(a < b) return 1;
// });
movements.sort((a,b)=> b- a )
console.log(movements);


///***************** */
///// Practice /////////
const Car = function (make , speed){
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate= function(){
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed}`);
}
Car.prototype.brake = function(){
  this.speed -=5;
  console.log(`${this.make} is going at ${this.speed}`);
}
const BMW = new Car("BMW",120);
const mercedes = new Car("Mercedes",95);

BMW.accelerate();
BMW.brake();

/////**************** */
///// ES6 Classes //////

// 1. Classes are not hoisted.
// 2. classes are first class citizens. 
// 3. Classes are executed in strict Mode. 

class PersonCL {
  constructor(firstName , birthYear){
    this.firstName=firstName;
    this.birthYear=birthYear;
  }
  // method will added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet(){
    console.log(`Hey ${this.firstName}`); 
  }
} 

const jessica =new PersonCL('Jessica', 1996);
console.log(jessica);
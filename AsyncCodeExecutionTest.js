'use strict';

// console.log('Test start'); // 1st
// setTimeout(() => console.log('0 seconds timer'), 0); // 4th
// Promise.resolve('Resolved promise 1').then(res => console.log(res)); // 3rd
// Promise.resolve('Resolved promise 2').then(res => {
//   // for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log('Test end'); // 2nd

////////////////////////////////////////////////
// Creating promise from scrach
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening! 🤞');

  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You WIN (●*◡*●)!!!!');
    } else {
      reject('You lost your money ¯\\_(ツ)_/¯');
    }
  }, 2000);
});

lotteryPromise
  .then(responce => console.log(responce))
  .catch(err => console.error(err));

///////////////////////////////////////////
// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 more second'));

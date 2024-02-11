'use strict';

console.log('Test start'); // 1st
setTimeout(() => console.log('0 seconds timer'), 0); // 4th
Promise.resolve('Resolved promise 1').then(res => console.log(res)); // 3rd
Promise.resolve('Resolved promise 2').then(res => {
  // for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test end'); // 2nd

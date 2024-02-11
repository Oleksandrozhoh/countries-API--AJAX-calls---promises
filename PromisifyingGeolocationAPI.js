'use strict';

navigator.geolocation.getCurrentPosition(
  function (possition) {
    // console.log(possition);
  },
  function (err) {
    console.error(err);
  }
);

function getPossition() {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   possition => resolve(possition),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

getPossition().then(data => console.log(data));

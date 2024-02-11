'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
function renderCountry(countryData, className = '') {
  const html = `<div class="countries">
  <article class="country ${className}">
    <img class="country__img" src="${countryData.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${countryData.name.common}</h3>
      <h4 class="country__region">${countryData.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +countryData.population / 1000000
      ).toFixed(1)} Mil</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(countryData.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${[
        Object.keys(countryData.currencies),
      ]}</p>
    </div>
  </article>
</div>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
}

function renderError(error) {
  countriesContainer.insertAdjacentText('beforeend', error);
}

function getJsonResponce(requestURL) {
  return fetch(requestURL).then(function (responce) {
    if (!responce.ok) throw new Error(`Country not found (${responce.status})`);
    return responce.json();
  });
}

const getContryData = function (country) {
  getJsonResponce(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (data) {
      renderCountry(data[0]);
      const borderCountry = data[0].borders?.[0];
      if (!borderCountry) throw new Error('No neighbour countries');
      return getJsonResponce(
        `https://restcountries.com/v3.1/alpha/${borderCountry}`
      );
    })
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(`${err} 🤦‍♂️🤦‍♂️🤦‍♀️`);
      renderError(`Something went wrong ${err.message}. Try again!`);
    });
};

// getContryData('usa');

// btn.addEventListener('click', function () {
//   let coords;
//   navigator.geolocation.getCurrentPosition(function (response) {
//     console.log(response.coords.latitude);
//     coords = response.coords.longitude;
//   });

//   console.log(coords);
// });

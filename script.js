'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

function displayCountryData(countryName) {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://restcountries.com/v3.1/name/${countryName.toLowerCase()}`
  );
  request.send();

  request.addEventListener('load', function () {
    const response = request.responseText;
    const [data] = JSON.parse(response);
    console.log(data);

    const html = `<div class="countries">
  <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} Mil</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${[
        Object.keys(data.currencies),
      ]}</p>
    </div>
  </article>
</div>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
  });
}

// displayCountryData('portugal');
// displayCountryData('united states of america');
// displayCountryData('germany');

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
  console.log(Object.values(countryData.languages)[0]);
  countriesContainer.insertAdjacentHTML('beforeend', html);
}

function displayCountryAndNeighbourData(countryName) {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://restcountries.com/v3.1/name/${countryName.toLowerCase()}`
  );
  request.send();

  request.addEventListener('load', function () {
    const response = request.responseText;
    const [countryData] = JSON.parse(response);
    renderCountry(countryData);
    console.log(countryData);
    const borders = countryData.borders;
    borders.forEach(country => {
      const request = new XMLHttpRequest();
      request.open('GET', `https://restcountries.com/v3.1/alpha/${country}`);
      request.send();
      request.addEventListener('load', function () {
        const response = request.responseText;
        const [countryData] = JSON.parse(response);
        renderCountry(countryData, 'neighbour');
      });
    });
  });
}

displayCountryAndNeighbourData('usa');

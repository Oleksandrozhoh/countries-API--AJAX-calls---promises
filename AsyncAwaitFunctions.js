'use strict';

const countriesContainer = document.querySelector('.countries');

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

const whereAmI = async function (country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    const data = await response.json();
    console.log(data[0]);
    renderCountry(data[0]);
  } catch (err) {
    console.error(err);
  }
};

whereAmI('usa');

/* eslint-disable prefer-arrow-callback */
/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable n/no-unsupported-features/node-builtins */
// #region required-template
import './reset.css';
import './style.css';
// [x]TODO: fetch API
// [x]TODO: process json
// [ ]TODO: input form (location)
// [ ]TODO: error handling

// [ ]TODO: "loading time" + test on DevTools for low end devices

// eslint-disable-next-line no-unused-vars
const testElement = document.createElement('div');
// #endregion

// DOM elements
/** @type {Array.<HTMLInputElement>} */
const [form = document.querySelector('form'), searchBar = document.querySelector('input')] = [];

// get city from input
function getCityfromInput(event_) {
  event_.preventDefault();
  const cityURL = encodeURIComponent(searchBar.value);
  console.log('cityURL:', cityURL);
  getWeatherForCity(cityURL);
}
form.addEventListener('submit', getCityfromInput);
console.log(form);

// API functions

async function fetchWeather(apiString) {
  const response = await fetch(apiString, { mode: 'cors' });
  const responseJSON = await response.json();
  return responseJSON;
}

function handleError(unsafeFunction) {
  return function () {
    return unsafeFunction().catch(function (error) {
      console.log(error);
      // throw error;
    });
  };
}

async function getWeatherForCity(cityURL) {
  const apiString = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityURL}?unitGroup=us&key=DZE4DLL8Y94HFL5G8DRAWPKgg&contentType=json`;
  const getWeatherSafe = handleError(fetchWeather.bind(this, apiString));
  const weatherData = await getWeatherSafe();
  console.log('weatherData:', weatherData)
}

function processWeatherData() {
  function extractWeatherData({ alerts, address, description, currentConditions, days }) {
    return {
      alerts,
      address,
      description,
      currentConditions,
      days,
    };
  }

  const weatherDataFiltered = extractWeatherData(weatherData);
  const targetWeatherFields = [
    'conditions',
    'temp',
    'feelslike',
    'humidity',
    'precip',
    'precipprob',
    'preciptype',
    'snow',
    'snowdepth',
    'uvindex',
    'icon',
  ];

  function filterByDesiredFields(targetObject, selectedFields) {
    return Object.entries(targetObject).filter(([key, value]) => selectedFields.includes(key));
  }
  const weatherTodayFiltered = filterByDesiredFields(
    weatherDataFiltered.currentConditions,
    targetWeatherFields
  );
  const weather15DaysFiltered = weatherDataFiltered.days.map((day) =>
    filterByDesiredFields(day, targetWeatherFields)
  );
}

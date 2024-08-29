/* eslint-disable prefer-arrow-callback */
/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable n/no-unsupported-features/node-builtins */
// #region required-template
import './reset.css';
import './style.css';
// [ ]TODO: fetch API
// [ ]TODO: process json
// [ ]TODO: input form (location)
// [ ]TODO: error handling

// [ ]TODO: "loading time" + test on DevTools for low end devices

// eslint-disable-next-line no-unused-vars
const testElement = document.createElement('div');
// #endregion

// DOM elements
const domInputs = document.querySelectorAll('input');
/** @type {Array.<HTMLInputElement>} */
const [passwordOriginal = document.querySelector('input#password')] = [];

// API functions
const apiString =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York?unitGroup=us&key=DZE4DLL8Y94HFL5G8DRAWPKgg&contentType=json';

async function getWeather() {
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

const getWeatherSafe = handleError(getWeather);
const weatherObject = await getWeatherSafe();
console.log('weatherObj:', weatherObject);

// function processWeatherObject(weatherObject_) {}

// const destructureWeatherObject = ({ address, description }) => ({ address, description });

function destructureWeatherObject({ address, description, currentConditions, days }) {
  return { address, description, currentConditions, days };
}
const weatherObjectFiltered = destructureWeatherObject(weatherObject);
const desiredWeatherInfo = ['temp', 'feelslike', 'humidity'];
const wantedInfo = Object.entries(weatherObjectFiltered.currentConditions).filter(([key, value]) =>
  desiredWeatherInfo.includes(key)
);

console.log('wantedInfo:', wantedInfo)
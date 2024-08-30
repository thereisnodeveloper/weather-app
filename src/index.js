import './reset.css';
import './style.css';

import DisplayManager from './display';

/* eslint-disable sonarjs/todo-tag */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable n/no-unsupported-features/node-builtins */

// [x]TODO: fetch API
// [x]TODO: process json
// [x]TODO: input form (location)
// [ ]TODO: error handling

// [ ]TODO: "loading time" + test on DevTools for low end devices

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
  console.log('weatherData:', weatherData);
}

/* FIXME: not sure how to wait for DisplayManager to populate
 DisplayManager.dataFromDOM */
await DisplayManager.initialize(); // ???: am I initializing right?
getWeatherForCity(DisplayManager.dataFromDOM.cityURL); // ???



/*
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

*/

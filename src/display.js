// DOM elements
const testElement = document.createElement('div');
/** @type {Array.<HTMLInputElement>} */
const [form = document.querySelector('form'), searchBar = document.querySelector('input')] = [];

// Manipulates DOM
export default class DisplayManager {
  static async initialize() { // ???: make sure I can use async here
    form.addEventListener('submit', this.getCityfromInput);
    console.log(form);
  }

  static getCityfromInput(event_) {
    event_.preventDefault();
    DisplayManager.dataFromDOM.cityURL = encodeURIComponent(searchBar.value);
// ???: will it violate separation of concerns to call getWeatherForCity from index.js?
}

  static dataFromDOM = {};
}

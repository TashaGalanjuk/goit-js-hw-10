// import './css/styles.css';

// const DEBOUNCE_DELAY = 300;

import fetchCountries from './js/fetchCountries.js';
import oneCounrtyArticle from './tamplates/oneCounrtyArticleTempl.hbs';
import countriesList from './tamplates/countriesListTempl.hbs';
import refs from './js/refs.js';
const { list, article, form, input } = refs;

import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

const debounce = require('lodash.debounce');

input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  const seachQuery = e.target.value;
  
clearArticlesContainer();
  console.log(seachQuery)
  
  fetchCountries(seachQuery.trim())
    .then(data => {
      if (data.length === 1) {
        counrtyArticleMarkup(data);
      } else if (data.length <= 10) {
        countriesListMarkup(data);
      } else if (data.length > 10) {
        errorSearch();
      }
    })
    .catch(error => {
      errorSearch();
    })
}

function errorSearch() {
  error({ text: 'Too many matches found. Please enter a more specific query!' });
}

function counrtyArticleMarkup(countries) {
  article.insertAdjacentHTML('beforeend', oneCounrtyArticle(countries));
}
function countriesListMarkup(countries) {
  list.insertAdjacentHTML('beforeend', countriesList(countries));
}
function clearArticlesContainer() {
  list.innerHTML = '';
  article.innerHTML = '';
}
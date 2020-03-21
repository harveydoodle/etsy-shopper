import {get} from 'lodash';
const axios = require('axios');

import {ETSY_APP_API_KEY, GOOGLE_MAPS_API_KEY} from './vars';

const etsyBaseUrl = 'https://openapi.etsy.com/v2';

export const fetchAllShops = () => {
  axios
    .get(`${etsyBaseUrl}/shops?api_key=${ETSY_APP_API_KEY}&limit=100`)
    .then(function(response) {
      // handle success
    })
    .catch(function(error) {
      // handle error
    })
    .then(function() {
      // always executed
    });
};
export const fetchTopCategories = cb => {
  axios
    .get(`${etsyBaseUrl}/taxonomy/categories?api_key=${ETSY_APP_API_KEY}`)
    .then(function(response) {
      // handle success
      const minimalResults = get(response, 'data.results', []).splice(0, 6);
      cb(minimalResults);
    })
    .catch(function(error) {
      // handle error
    })
    .then(function() {
      // always executed
    });
};

export const fetchAddressSuggestions = (address, cb) => {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${GOOGLE_MAPS_API_KEY}&types=address&components=country:ca`,
    )
    .then(function(response) {
      cb && cb(response);
      // handle success
    })
    .catch(function(error) {
      // handle error
    })
    .then(function() {
      // always executed
    });
};

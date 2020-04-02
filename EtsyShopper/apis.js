import {get} from 'lodash';
const axios = require('axios');

import {ETSY_APP_API_KEY, GOOGLE_MAPS_API_KEY} from './vars';

const etsyBaseUrl = 'https://openapi.etsy.com/v2';

export const fetchAllShops = ({lat, long, distance = 10}, cb) => {
  axios
    .get(
      `${etsyBaseUrl}/shops?api_key=${ETSY_APP_API_KEY}&fields=shop_id,shop_name,title&limit=20&lat=${lat}&lon=${long}&distance_max=${distance}`,
    )
    .then(function(response) {
      cb && cb(response);
    })
    .catch(function(error) {
      cb && cb(error);
    })
    .then(function() {
      // always executed
    });
};
export const fetchActiveListingsById = (id, sort, cb) => {
  let ep = `${etsyBaseUrl}/shops/${id}/listings/active?api_key=${ETSY_APP_API_KEY}&limit=10&fields=listing_id,title,price&includes=MainImage`;
  if (sort === 'price_ascending') {
    ep = ep.concat('&sort_on=price&sort_order=up');
  } else if (sort === 'price_descending') {
    ep = ep.concat('&sort_on=price&sort_order=down');
  }
  axios
    .get(ep)
    .then(function(response) {
      cb && cb(response);
    })
    .catch(function(error) {
      cb && cb(error);
    })
    .then(function() {});
};
export const fetchTopCategories = cb => {
  axios
    .get(
      `${etsyBaseUrl}/taxonomy/categories?api_key=${ETSY_APP_API_KEY}&limit=10`,
    )
    .then(function(response) {
      const minimalResults = get(response, 'data.results', []).splice(0, 6);
      cb && cb(minimalResults);
    })
    .catch(function(error) {
      cb && cb(error);
    })
    .then(function() {});
};

export const fetchAddressSuggestions = (address, cb) => {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${GOOGLE_MAPS_API_KEY}&types=geocode&components=country:ca`,
    )
    .then(function(response) {
      cb && cb(response);
    })
    .catch(function(error) {
      cb && cb(error);
    })
    .then(function() {});
};

export const fetchGeolocation = (addressString, cb) => {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${addressString}&key=${GOOGLE_MAPS_API_KEY}`,
    )
    .then(function(response) {
      cb && cb(response);
    })
    .catch(function(error) {
      cb && cb(error);
    })
    .then(function() {});
};

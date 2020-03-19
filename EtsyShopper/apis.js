const axios = require('axios');

const apiKey = process.env.ETSY_APP_API_KEY
const baseUrl = "https://openapi.etsy.com/v2/shops?api_key=zxu8g8cudka49ozdsp64od6d&limit=2";

export const fetchAllShops = () => {
  axios
    .get(`${baseUrl}`)
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

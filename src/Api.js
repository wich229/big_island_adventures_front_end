/*
SOURCE CODE: 
https://github.com/aramvr/react-accuweather/blob/master/src/api/Api.js
*/
const API_KEY = process.env.ACCUWEATHER_API_KEY
const API_HOST = 'http://dataservice.accuweather.com/';
const API_VERSION = 'v1';

//param = postalcode"http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=%20KwEOp0fg9DesFJhrcSCVraGLNIvgkXHd%20&q=
//group = country code
const LocationApiUrl = (postalcode) => `${API_HOST}locations/${API_VERSION}/postalcodes/search?apikey=${API_KEY}%20&q=${postalcode}`;
// key = postal code
const WeatherApiUrl = key => `${API_HOST}forecasts/${API_VERSION}/daily/1day/${key}?apikey=${API_KEY}`;

export default function getLocations() {
  return fetch(LocationApiUrl('topcities', 50)).then(response => response.json());
}
export function getWeather(key) {
  return fetch(WeatherApiUrl(key))
    .then(response => response.json());
}


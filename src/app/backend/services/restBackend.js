import mod from '../backend';
import Joke from '../models/Joke';

var $http;

function setHttp(http) {
  $http = http;
}

function get(url) {
  return $http.get(url);
}

function getJoke() {
  return get('http://api.icndb.com/jokes/random').then(function (response) {
    return new Joke(response.data.value);
  });
}



export default {
  setHttp: setHttp,
  getJoke: getJoke
};

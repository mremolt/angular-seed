var $http;

function setHttp(http) {
  $http = http;
}

function get(url) {
  return $http.get(url);
}


export default {
  setHttp: setHttp,
  get: get
};

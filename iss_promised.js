const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (ipObj) => {
  return request(`http://ipwho.is/${ipObj.ip}`);
};

const fetchISSFlyOverTimes = (geoObj) => {
  const { latitude, longitude } = geoObj;
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);

};

module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};

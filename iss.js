/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  // ...
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,(err,res,body) => {
    if (err) {
      callback(err,null);
      return;
    }
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching ISS passing time. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);

    console.log(data);
    callback(null, data.response);
  });
};






/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchCoordsByIP = (ip, cb) => {
  // use request to fetch IP address from JSON API
  request(`http://ipwho.is/${ip}`,(err,res,body) => {
    if (err) {
      cb(err, null);
      return;
    }
    // if non-200 status, assume server error

    const data = JSON.parse(body);
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      cb(Error(message), null);
      return;
    }

    const { latitude, longitude } = data;

    cb(null, {latitude, longitude});
  });
};

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(`https://api.ipify.org?format=json`,(err,res,body) => {
    if (err) {
      callback(err, null);
      return;
    }
    // if non-200 status, assume server error
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    callback(err, data.ip);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP ,fetchISSFlyOverTimes};

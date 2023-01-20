const {fetchMyIP, fetchCoordsByIP,fetchISSFlyOverTimes} = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:',ip);
  fetchCoordsByIP(ip,(err,geoObj) => {
    if (err) {
      console.log('It is not fetching geo information. ',err);
      return;
    }
    console.log(`Your GEO location is Latitude: ${geoObj.latitude}, longitude: ${geoObj.longitude}`);
    fetchISSFlyOverTimes(geoObj,(err,data) => {
      if (err) {
        console.log(`Something went wrong when fetching ISS passing time! `);
        return;
      }
      console.log(data);
    });
  });
});

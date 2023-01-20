const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss_promised');


fetchMyIP().then((ip) => {
  const data = JSON.parse(ip);
  return data;
}).then(fetchCoordsByIP).then((data) => {
  const dataObj = JSON.parse(data);
  const geoObj = {latitude: dataObj.latitude,longitude: dataObj.longitude};
  return geoObj;
}).then(fetchISSFlyOverTimes).then((data) => {
  const times = JSON.parse(data).response;
  for (let time of times) {
    const timeNow = Date.now();
    const riseTimeStamp = timeNow + time.risetime;
    const newDate = new Date(riseTimeStamp);
    const duration = time.duration;
    console.log(`Next pass at ${newDate.toLocaleString()} for ${duration} seconds!`);
  }
}).catch(err => console.log(err));

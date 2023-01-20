const {nextISSTimesForMyLocation} = require('./iss');

nextISSTimesForMyLocation((err,data) => {
  if (err) {
    console.log('Something went wrong: ' + err.message);
    throw new Error(err.message);
  }

  for (let time of data) {
    const timeNow = Date.now();
    const riseTimeStamp = timeNow + time.risetime;
    const newDate = new Date(riseTimeStamp);
    const duration = time.duration;
    console.log(`Next pass at ${newDate.toLocaleString()} for ${duration} seconds!`);
  }

});

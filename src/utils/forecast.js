const request = require('request');
const apiKey = "075534a46a3e3f9df0f47ef04d4503f8";

const forecast = (lat, lan, callback) => {
  const url = `https://api.darksky.net/forecast/${apiKey}/${lat},${lan}?units=si`;
  request({ url, json: true }, (error, { body }) => {
    if(error) {
      callback('Unable to forecast. Please try again later', undefined);
    } else if(body.currently === undefined) {
      callback("Wrong location. Please try with different location", undefined);
    } else {
      const data = body.currently;
      const timezone = body.timezone;
      callback(undefined, `Temperature is ${data.temperature} degrees. Summary: ${data.summary}`);
    }
  })
}

module.exports = forecast;
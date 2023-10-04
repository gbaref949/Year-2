const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://national-weather-service.p.rapidapi.com/zones/%7Btype%7D/%7BzoneId%7D/forecast',
  headers: {
    'X-RapidAPI-Key': '494b16716emshea02f4a63fe3d09p1db10ejsn50cfd474da53',
    'X-RapidAPI-Host': 'national-weather-service.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
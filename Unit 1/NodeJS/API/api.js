const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://dark-sky.p.rapidapi.com/%7Blatitude%7D,%7Blongitude%7D',
  params: {
    units: 'auto',
    lang: 'en'
  },
  headers: {
    'X-RapidAPI-Key': '494b16716emshea02f4a63fe3d09p1db10ejsn50cfd474da53',
    'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
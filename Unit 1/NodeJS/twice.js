const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/auto-complete',
  params: {q: 'cars'},
  headers: {
    'X-RapidAPI-Key': '494b16716emshea02f4a63fe3d09p1db10ejsn50cfd474da53',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  }
};
async function main(){
try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
}
main()
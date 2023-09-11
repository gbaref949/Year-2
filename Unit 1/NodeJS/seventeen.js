const http = require('https');

const options = {
	method: 'GET',
	hostname: 'imdb8.p.rapidapi.com',
	port: null,
	path: '/auto-complete?q=meg',
	headers: {
		'X-RapidAPI-Key': '494b16716emshea02f4a63fe3d09p1db10ejsn50cfd474da53',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();
// HTTP App Template
const http = require('http');
const path = require('path');
const {readFileSync} = require('fs');

// get all files
const homePage = readFileSync(path.join(__dirname, '/public/index.html'));
const aboutPage = readFileSync(path.join(__dirname, '/public/about.html'));
const contactPage = readFileSync(path.join(__dirname, '/public/contact.html'));

const server = http.createServer(function (req, res) {
    const url = req.url;
    console.log(url);

    // Homepage
    if(url === '/'){
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(homePage);
        res.end();
    // kyoto page
    }else if(url === '/about'){
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(aboutPage);
        res.end();
    // tokyo page
    }else if(url === '/contact'){
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(contactPage);
        res.end();
    // error page
    }else{
        res.writeHead(404, {'content-type': 'text/html'});
        res.write('<h1>Page not found</h1>');
        res.end()
    }
})
server.listen(5000);
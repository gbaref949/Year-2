const http = require('http');
const path = require('path');

const server = http.createServer((req, res) =>{
    console.log(req.method)
    const url = req.url
    //home page
    if(url === '/'){
        res.writeHead(200, {'content-type': 'test/html'})
        res.write('<h1> Home page of Georgie </h1>')
        res.end()
    }
    else if (url === '/about/'){
        res.writeHead(200, {'content-type': 'test/html'})
        res.write('<h1> About page of Georgie </h1>')
        res.end()
    }
    else{
        res.writeHead(404, {'content-type': 'test/html'})
        res.write('<h1> 404 Not Found </h1>')
        res.end()
    }
})
server.listen(6000)
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) =>{
    console.log(req.method)
    const url = req.url
    //home page
    if(url === '/'){
        res.writeHead(200, {'content-type': 'text/html'})
        res.write('<h1> Home page of Georgie </h1>')
        res.end()
    }
    //about page
    else if (url === '/about/'){
        res.writeHead(200, {'content-type': 'text/html'})
        fs.copyFile('/index.html', '/about.html', (err) => {
    if (err) 
        throw err;
    console.log('source.txt was copied to destination.txt');
        })
        res.writeFile(path.join(__dirname, '/about.html'), 'utf8')
        res.write('<h1> About page of Georgie </h1>')
        res.end()
    }
    //contact page
    else if (url === '/contact/'){
        res.writeHead(200, {'content-type': 'text/html'})
        fs.copyFile('/index.html', '/contact.html', (err) => {
    if (err) 
        throw err;
    console.log('source.txt was copied to destination.txt');
        })
        res.writeFile(path.join(__dirname, '/contact.html'), 'utf8')
        res.write('<h1> Contact page of Georgie </h1>')
        res.end()
    }
    //gallery page
    else if (url === '/gallery/'){
        res.writeHead(200, {'content-type': 'text/html'})
        fs.copyFile('/index.html', '/gallery.html', (err) => {
    if (err) 
        throw err;
    console.log('source.txt was copied to destination.txt');
        })
        res.writeFile(path.join(__dirname, '/gallery.html'), 'utf8')
        res.write('<h1> Gallery page of Georgie </h1>')
        res.end()
    }
    //testimonals page
    else if (url === '/testimonials/'){
        res.writeHead(200, {'content-type': 'text/html'})
        fs.copyFile('/index.html', '/testimonials.html', (err) => {
    if (err) 
        throw err;
    console.log('source.txt was copied to destination.txt');
        })
        res.writeFile(path.join(__dirname, '/testimonials.html'), 'utf8')
        res.write('<h1> Testimonials page of Georgie </h1>')
        res.end()
    }
    //404 page
    else{
        res.writeHead(404, {'content-type': 'text/html'})
        res.write('<h1> 404 Not Found </h1>')
        res.end()
    }
})//server port
server.listen(5000)
console.log('Server is running on port')
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
    else if (url === '/about/'){
        res.writeHead(200, {'content-type': 'text/html'})
        fs.copyFile('/index.html', '/about.html', (err) => {
    if (err) 
        throw err;
    console.log('source.txt was copied to destination.txt');
        })
        // res.writeFile(path.join(__dirname, '/about.html'), 'utf8')
        res.write('<h1> About page of Georgie </h1>')
        res.end()
    }
    // else if (url === '/contact/'){
    //     res.writeHead(200, {'content-type': 'text/html'})
    //     res.writeFile(path.join(__dirname, '/contact.html'), 'utf8')
    //     res.write('<h1> About page of Georgie </h1>')
    //     res.end()
    // }
    // else if (url === '/gallery/'){
    //     res.writeHead(200, {'content-type': 'text/html'})
    //     res.writeFile(path.join(__dirname, '/gallery.html'), 'utf8')
    //     res.write('<h1> About page of Georgie </h1>')
    //     res.end()
    // }
    // else if (url === '/testimonials/'){
    //     res.writeHead(200, {'content-type': 'text/html'})
    //     res.writeFile(path.join(__dirname, '/testimonials.html'), 'utf8')
    //     res.write('<h1> About page of Georgie </h1>')
    //     res.end()
    // }
    else{
        res.writeHead(404, {'content-type': 'text/html'})
        res.write('<h1> 404 Not Found </h1>')
        res.end()
    }
})
server.listen(5000)
console.log('Server is running on port')
const http = require('http');

const server = http.createServer((req, res)=>{
  //Conditional Routing 
  if(req.url === '/'){
    res.end('Welcome to the Home page');
  }else if(req.url === '/about'){
    res.end('Welcome to the About page')
  }else{
    res.end('404 YOU SUCK')
    res.end(`<h1> Oops! SOmething went wrong </h1>
    <p>We can't seem to find the page you are looking for.</p>]
    <a href="/">Home</a>`)
  }
})
console.log("It's running")
server.listen(5000)
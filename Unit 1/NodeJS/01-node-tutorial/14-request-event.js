const fs = require('fs');
const http = require('http');
const EventEmitter = require('events');
// const bodyParser = require('body-parser');

const customEmitter = new EventEmitter();
// const server = http.createServer((req, res) => {
//   res.end('welcome');
//});

let siteVisted = 0;
// Using Event Emitter Apiconst 
fs.readFile("./aboutUs.html", function(req,html){
    if(err){throw err;}
})
const server = http.createServer();
// server.use(bodyParser.urlencoded({extended: true}));
// emits request event
// subscribe to it/ liten to it/ respond to it
server.on("request", (req, res)=>{
    if(req.url === "/about"){
        console.log(req.url);
        customEmitter.emit('visted', req.method, req.url)
        res.end("about");
    }else if(req.url === "/time"){
        res.writeHeader(200, {"Content-Type": "text/html"} )
        res.write(html)
        res.end()
    }
    //res.sendFile(__dirname + "/aboutUs.html")
    // res.end("welcome");
});

customEmitter.on('visted', (method, url) => {
    siteVisted++;
    console.log(`Event has been triggered: This site has been visted ${siteVisted}`);
    console.log(`Method is: ${method} the url is ${url}`);
})

server.listen(5000);
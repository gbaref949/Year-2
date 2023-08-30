const express = require('express');
const path = require('path');
const app = express();

//setup static middleware

//Middleware come in the middle of the request and respones cycle of the node.js exceution. It provides success to many functions like req and res objects 

/*Response Object is passed as the second param to the requestLister function ..; The responses object represents the writtable stream back to the client 
--write() Send text or text streams to the client
--writeHead() Sends status and respone header to the client
--getHeader() Return the value of the specified header
--setTimeout() sets the timeout value of the socket to the specified value in miili secs
--statusCode - sets the staus code that will be sent to the client 
--end () Signals that the server should consider that the responese is complete

header, content, then finsh with res.end()

For the write Head and the statusCode methods the FOllowing are acceptible:
100 - 199 information respones 
200-299 Succesful response
300-399 redirect message
400-499 client error 
500-599 server error 


https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

//Request Object is made by a client to a named host which is located on the server. The aim of the req is to access the reources on the server

A proper HTTP req contains the following 
-- A req line
-- A series of HTTP header(s)
-- A message body if needed

Req Line had 3 Main aspects
--A method like GET, UPDATE, DELETE...etc tells the sever what it should do with the resource
--The Path component identifies the resource on the server
--The HTTP version numer shows what specification to which the client has tried to make the message comply

HTTP HEADERS:

HTTp headers are written on a message to provide the recipients with information about the req, the sender and the way in which the sender wants to communicate with the server/recipient.

Ex.HTTP {'content-type': 'test/html'}
-host, user-agent...etc

*/

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) =>{
    console.log(req.url);
    res.sendFile(path.join(__dirname, '/public'))
})

app.get('*', (req, res) =>{
    res.status(404).send("404 Not Found")
})

app.listen(5000, () =>{
    console.log('Server listening on port 5000')
})
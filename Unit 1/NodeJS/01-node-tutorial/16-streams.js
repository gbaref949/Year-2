const {createReadStream, createWriteStream} = require('fs')
const path = require('path')
//default (min) 64kb size
//last buffer - remainder
//highWaterMark - ccontrol bit size

//start - What character to start reading from
//end - What character to end reading from
const stream = createReadStream(path.join(__dirname, '/content/bigFile.txt'), {
    encoding: 'utf8', 
    start: 0,
    end: 25,
    highWaterMark: 64*1024,
})//or highWaterMark: 90000

stream.on("data", (result)=>{
    console.log(result)
    console.log('\n')
})
stream.on('error', (error)=> {console.log(error)})

/*
Streams 101
There are four fundmental streams types in Node.js:
Reable, Writable, Duplex, and Transform Streams

--> A readble strem is an abstration for a source from which data can n=be sonsumed. An example of that is the fs.creatReadStream method

--> A writeable streamis an abstraction for  a destination from which data can be written. An example that is the fs.createWriteStream metjod

--> Duplex stream is both readble and writable and axample of that is a TCP socket

--> A transorm stream is abaically a duplex strean that can be used to modify or transform data as it is awritten and read. An example of that is the zlib,creatGzip stream to compress the data using gzip. You can think of a transform stream as s function where the input is writable stream part and the output is arwable stream part. You might also hear transdorm streams referes to as "Through streams"

All streams are instances of EventEmiiter. They will emit event that can be used read and write data. However we can consume stream data in a simpler way using pipe method.*/


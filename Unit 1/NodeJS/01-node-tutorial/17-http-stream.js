var http = require('http');
var fs = require('fs');
const path = require('path');
const PORT = 5000

//In this example you can check the network responese to see how the data is starting out as a large data file of 1.8+mb and then changes into a chucked version of 64kb

http.createServer(function(req, res){
    //this is the non streamed so it takes much longer 
    // const text = fs.readFileSync(path.join(__dirname, '/content/newBigFile.txt'), 'utf8');
    // res.end(text)

    const fileStream = fs.createReadStream(path.join(__dirname, "./content/newBigFile.txt"), 'utf8');
    fileStream.on("open", () => {
        fileStream.pipe(res);
    });
    fileStream.on("error", (err) => {
        res.end(err)
    })
    
}).listen(PORT, function(){
    console.log(`sever listening on ${PORT}`)})
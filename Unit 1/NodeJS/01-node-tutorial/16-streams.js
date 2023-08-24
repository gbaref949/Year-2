const {createReadStream, createWriteStream} = require('fs')
const path = require('path')
//default (min) 64kb size
//last buffer - remainder
//highWaterMark - ccontrol size

const stream = createReadStream(path.join(__dirname, '/content/newBigFile.txt'), {encoding: 'utf8', highWaterMark: 90000})
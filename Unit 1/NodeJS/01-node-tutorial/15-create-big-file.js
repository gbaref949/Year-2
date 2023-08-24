const {writeFileSync} = require('fs')
const path = require('path')
//every bit of data is written to the end of the file
let message = `The interactive Coding prorgam prepares students for a career as a software developer. It teachs students how to desgin and develop softeware and build apps for phones, tablets, website and write and test computer code.${i}\n`;
for(let i=0; i<1000; i++){
    writeFileSync(path.join(__dirname, "/content/bigFile.txt"), message, {flag:"a"})
}
//10 To Times


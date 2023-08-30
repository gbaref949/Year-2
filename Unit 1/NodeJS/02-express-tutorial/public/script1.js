// //use the fs modeule and print out the filelist of ypur desktop
// const path = require('path');
// const fs = require('fs');
// //joining path of directory 
// const directoryPath = path.join(__dirname, '../../../../../../../../gbaref949/');
// //passsing directoryPath and callback function
// fs.readdir(directoryPath, function (err, files) {
//     //handling error
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     } 
//     //listing all files using forEach
//     files.forEach(function (file) {
//         // Do whatever you want to do with the file
//         console.log(file); 
//     });
// });
const { path} = require('path'), { http } = require('http'), { fs } = require('fs'), { listen } = 5000, { server }  = http.createServer((res, req) => {
     console.log('Hello my server')
})
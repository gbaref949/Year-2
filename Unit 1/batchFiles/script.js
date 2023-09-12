/*
Students are to create a function or program that does the following USING JS COMMANDS ONLY
Reads and displays all files in a chosen folder
Re-names all files in the folder using a string template with an increasing number representing the file's order in the sequence

Extra Credit(10)
Create an HTML user interface using node Allowing for more customizations and individual file selection for renaming. You may need libraries like no-cors 

Make sure that the user interface for HTML can point to a folder and navigate to find the correct folder
Make sure the JS has a string template for renaming
RETURN THE JS FILE WITH THE CODE
*/

//defined the fs and path modules
const fs = require('fs');
const path = require('path');

import { appendFile } from 'node:fs';

//joining path of directory
const directoryPath = path.join(
  __dirname,
  '../../../../../../gbaref949/'
);
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    console.log(file);
  });
});

//renamed files
fs.renameSync(
  path.join(__dirname, 'New Text Document.txt'),
  path.join(__dirname, '')
);
fs.renameSync(
  path.join(__dirname, 'New Text Document (2).txt'),
  path.join(__dirname, '')
);
fs.renameSync(
  path.join(__dirname, 'New Rich Text Document.rtf'),
  path.join(__dirname, '')
);

//renamed and moved files
fs.renameSync(
  path.join(__dirname, './tryThis/New Text Document.txt'),
  path.join(__dirname, '')
);

//just added it since easier
appendFile('message.txt', 'data to append', (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});

//this gets the last word in the files
let files = [
  'Latin gobbledygook.txt',
  'Princess Bubblegum is a problem.txt',
  'Learning is Hard.txt',
  'Regular Bros Show.txt',
];

let lastWords = [];
files.forEach((file) => {
  const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
  const words = content.split(' ');
  lastWords.push(words[words.length - 1]);
});

//the writes the last words to answer.js
fs.writeFileSync(
  path.join(__dirname, './Answer/answer.js'),
  lastWords.join(' ')
);
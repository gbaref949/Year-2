//defined the fs and path modules
const fs = require('fs');
const path = require('path');

//renamed files
fs.renameSync(
  path.join(__dirname, 'New Text Document.txt'),
  path.join(__dirname, 'Latin gobbledygook.txt')
);
fs.renameSync(
  path.join(__dirname, 'New Text Document (2).txt'),
  path.join(__dirname, 'Princess Bubblegum is a problem.txt')
);
fs.renameSync(
  path.join(__dirname, 'New Rich Text Document.rtf'),
  path.join(__dirname, 'Learning is Hard.txt')
);

//renamed and moved files
fs.renameSync(
  path.join(__dirname, './tryThis/New Text Document.txt'),
  path.join(__dirname, 'Regular Bros Show.txt')
);

//delted this folder
// fs.rmSync(path.join(__dirname, './tryThis'), { recursive: true });//this broke my whole system so I  just renamed it instead

//just renamed it since easier
fs.renameSync(
  path.join(__dirname, './tryThis'),
  path.join(__dirname, './Answer')
);

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

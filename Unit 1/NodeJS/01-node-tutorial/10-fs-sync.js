const {readFileSync, writeFileSync} = require('fs')
const path = require('path');
console.log('it HAD TO HAPPEN')
const first = readFileSync(path.join(__dirname, '/content/first.txt'), 'utf8')
const second = readFileSync(path.join(__dirname, '/content/second.txt'), 'utf8')

console.log(first)
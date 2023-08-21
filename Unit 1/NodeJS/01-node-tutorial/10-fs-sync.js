const {readFileSync, writeFileSync} = require('fs')
const path = require('path');
console.log('it HAD TO HAPPEN')
const first = readFileSync(path.join(__dirname, '/content/first.txt'), 'utf8')
const second = readFileSync(path.join(__dirname, '/content/second.txt'), 'utf8')

writeFileSync(path.join(__dirname, '/content/result-async.txt'), `Here is the result: ${first}, and ${second}`,{flag: 'a'})//Open file for appending. The file is created if it does not exist.
console.log("Done with the task")

fs.open(path.join(__dirname, '/content/'), 'w', (err, fd) => {
    
});
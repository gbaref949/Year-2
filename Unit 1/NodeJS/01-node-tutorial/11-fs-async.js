const {readFile, writeFile, readFileSync, writeFileSync, read, write} = require('fs');
const path = require('path');
console.log('Winter is here')

//read and writeFile is asynchronous allowing for the program to contiune exceution until the other process has completed

//read and writeFileSync is just synchronous and will stop to exccute the process for excuting the rest of the code
readFile(path.join(__dirname, 'content/first.txt'),'utf8', (err, result)=>{
    if (err){
            console.log(err);
            return
        }
    const first = result
    readFile(path.join(__dirname, 'content/first.txt'),'utf8',(err, result)=>{
       if (err){
            console.log(err);
            return
        }
        const second = result 
        writeFile(path.join(__dirname, 'content/result-async.txt'),`here is the result: ${first}, ${second}`,(err, result)=>{
        if (err){
            console.log(err);
            return
        }
        console.log('done with this task');
        });
    });
})
console.log('staring next task');
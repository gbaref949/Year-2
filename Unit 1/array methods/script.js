const fs = require('fs');

try{
    const data = fs.readFileSync('app.js', 'utf-8').split('\n');//the split is only for this assignment since we are working with and array we can move it as we please but everything else is gonna be our structure
}
catch(err){
    console.log(err);
}
//CommonJS, every file is a module (by deafult)
//Modules - Encapsulated code (only share the min)

const name = require('./04-names');
const message = require('./05-ultils');
const data = require('./06-alternative-flavor')
require('./07-mind-generade.js')//immediatly runs the file; no declartaion needed

console.log(name)
message("Georgie")
message(name.peter)

console.log(data.items[1])
console.log(data.singlePerson.name)


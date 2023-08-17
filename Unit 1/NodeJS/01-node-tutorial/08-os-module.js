const os = require('os');
//information about the current users os
const user = os.userInfo();
console.log(user);

//method return the system uptime in seconds
console.log(`The system uptime is ${os.uptime()} seconds`);

const currentOS ={
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMen: os.freemem(),
}
console.log(currentOS);
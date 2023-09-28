const mongoose = require('mongoose');

const connectDB = (url) => {
    //Rember this is temp and needs to be replaced
    return mongoose.connect(url,{
    })

    // const connectString = "mongodb+srv://dummyUser:Bg5Fmc0nCsR4YM7t@georgiecluster.qjq92r5.mongodb.net/"

    // mongoose.connect(connectString)
    //     .then(()=>console.log('database connection established'))
    //     .catch(err=>console.log(err))
}

module.exports = connectDB
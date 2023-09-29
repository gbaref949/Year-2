const mongoose = require('mongoose');

const connectDB = (url) => {
    //Rember this is temp and needs to be replaced
    return mongoose.connect(url,{
    })
}

module.exports = connectDB
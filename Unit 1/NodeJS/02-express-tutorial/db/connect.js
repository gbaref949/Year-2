const mongoose = require('mongoose')

const connectDB = () => {
    return mongoose.connect(url,{
        //only reuired if using 6x or up
    })
    //Rember this is temp and needs to be replaced
    const connectString = "mongodb+srv://dummyUser:Bg5Fmc0nCsR4YM7t@georgiecluster.qjq92r5.mongodb.net/"

    mongoose.connect(connectString)
        .then(()=>console.log('database connection established'))
        .catch(err=>console.log(err))
}

module.exports = connectDB
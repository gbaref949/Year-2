const mongoose = require('mongoose')

const connectDB = () => {
    //Rember this is temp and needs to be replaced
    const connectString = "mongodb+srv://<username>:<password>@georgiecluster.qjq92r5.mongodb.net/"

    moongoose.connect(connectString)
    then(()=>console.log('database connection established')).
    catch(err=>console.log(err))
}

module.exports = connectDB
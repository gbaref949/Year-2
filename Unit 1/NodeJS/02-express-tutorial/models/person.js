const moongoose = require('mongoose');

const personSchema = new moongoose.Schema({
    name:{
        type: String,
        required: [true, 'Must provided a name'],
        trim:true,
        maxLength: [20, "The name can be more than 20 characters"]

    },
    age:{
        type: Number,
        default: 5
    },//comma to contiue to add on to the Schema
})

module.exports = moongoose.model('Person', personSchema)
Model.find({completed: true})
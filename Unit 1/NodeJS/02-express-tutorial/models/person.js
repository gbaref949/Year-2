const moongoose = require('mongoose');

const personSchema = new moongoose.Schema({
    FirstName:{
        type: String,
        required: [true, 'Must provided a name'],
        trim:true,
        maxLength: [20, "The name can be more than 20 characters"]

    },
    age:{
        type: Number,
        default: 5
    },//comma to contiue to add on to the Schema
    
    // completed:{
    //     type: Boolean,
    //     default: false
    // },
},{collection: "Contacts"})

//module.exports = moongoose.model('Task', TaskSchema)
module.exports = moongoose.model('Contacts', personSchema)
//Model.find({completed: true})//
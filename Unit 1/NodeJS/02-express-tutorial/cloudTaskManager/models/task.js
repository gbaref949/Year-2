//defined mongoose and required it
const mongoose = require('mongoose');

//defined User Schema
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    unique: true, 
    required: true 
  },
  password: { 
    type: String, 
    required: true
   },
  age: { 
    type: Number 
  },
  //profile image field if needed
  //profileImage: { 
  //type: String 
  //},
});

//defined Task Schema
const taskSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: [true, 'Must provided a name'],
    trim: true,
    maxLength: [20, 'The name can be more than 20 characters'],
  },
  description: { 
    type: String 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  //created a user assignment field if needed
  // assignedTo: { 
  // type: mongoose.Schema.Types.ObjectId, 
  // ref: 'User', 
  // },
},{ collection: 'Contacts' }
);

module.exports = mongoose.model('User', userSchema)
module.exports = mongoose.model('Contacts',taskSchema);
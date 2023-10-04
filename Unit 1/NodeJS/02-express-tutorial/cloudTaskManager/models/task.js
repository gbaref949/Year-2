//defined mongoose and required it
const mongoose = require('mongoose');

//defined User Schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    unique: true, 
    required: true 
  },
  age: { 
    type: Number 
  },
  //profile image
  //profileImage: { 
  //type: String 
  //},
  //created a user assignment field
  },{ collection: 'User' }
);

//defined Task Schema
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must provided a name'],
    trim: true,
    maxLength: [20, 'The name can be more than 20 characters'],
  },
  details: { 
    type: String 
  },
  check: { 
    type: Boolean, 
    default: false 
  },
  assignedTo: { 
  type: mongoose.Schema.Types.ObjectId, 
  ref: 'User', 
  },
},{ collection: 'Task' }
);

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Task', taskSchema);
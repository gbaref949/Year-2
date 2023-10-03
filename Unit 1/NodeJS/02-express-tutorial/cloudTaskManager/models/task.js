const moongoose = require('mongoose');

const taskSchema = new moongoose.Schema(
  {
    FirstName: {
      type: String,
      required: [true, 'Must provided a name'],
      trim: true,
      maxLength: [20, 'The name can be more than 20 characters'],
    },
    age: {
      type: Number,
      default: 21,
    },
    description: String,
    completed: {
      type: Boolean,
      default: false,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { collection: 'Contacts' }
);

//module.exports = moongoose.model('Task', TaskSchema)
module.exports = moongoose.model('Contacts', taskSchema);

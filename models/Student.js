const mongoose = require('mongoose');

// Define Student Schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [5, 'Age must be greater than 5']
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    enum: ['BCA', 'B.Tech', 'B.Sc', 'MCA', 'MBA', 'Other']
  }
}, { timestamps: true });

// Create and export model
module.exports = mongoose.model('Student', studentSchema);

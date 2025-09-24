// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
});

module.exports = mongoose.model('Course', courseSchema);

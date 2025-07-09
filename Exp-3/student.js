const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  regNo: String,
  dept: String,
  image: String,
  subjects: [
    {
      name: String,
      mark: Number,
    },
  ],
  labMarks: [Number],
  gpa: Number,
  cgpa: Number,
});

module.exports = mongoose.model("Student", studentSchema);

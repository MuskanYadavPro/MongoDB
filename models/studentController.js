const Student = require('../models/Student');

// ➕ Create a new student
exports.createStudent = async (req, res) => {
  try {
    const { name, age, course } = req.body;
    const newStudent = new Student({ name, age, course });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📖 Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update student by ID
exports.updateStudent = async (req, res) => {
  try {
    const { name, age, course } = req.body;
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, course },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Student not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ❌ Delete student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

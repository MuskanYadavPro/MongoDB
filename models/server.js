const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/studentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully!'))
.catch(err => console.error('❌ Connection Failed:', err));

// Routes
app.use('/students', studentRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Student Management System API!');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

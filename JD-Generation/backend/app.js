const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config(); 

// Import routes
const jobRoutes = require('./routes/job.route.js');
const mdDemo = require('./routes/demoJD.route.js');

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api', jobRoutes);
app.use('/api', mdDemo);

module.exports = app;

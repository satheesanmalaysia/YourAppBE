const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect Database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/profile'));

module.exports = app;

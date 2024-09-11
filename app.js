const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000', 'https://yourfrontendapp.com' , 'https://yourapp-fe.vercel.app'], // Frontend URLs
    credentials: true,
  }));
// Connect Database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/profile'));

module.exports = app; 

require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000', 'https://yourfrontendapp.com','https://yourapp-fe.vercel.app'], // Frontend URLs
    credentials: true,
  }));
// MongoDB connection URI
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MongoDB URI is not defined in environment variables.');
  process.exit(1); // Exit the process with an error code
}

// Set Mongoose options
mongoose.set('strictQuery', true); // or true, depending on your preference

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
  // Start the server after successful connection
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

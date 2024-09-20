const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const router = express.Router();
let messages = [];

// Send Message (POST)
router.post('/sendMessage', express.json(), (req, res) => {
  const { sender, receiver, message } = req.body;
  messages.push({ sender, receiver, message, timestamp: new Date() });

  // Notify the receiver
  io.to(receiver).emit('messageReceived', { sender, message });
  res.status(200).json({ status: 'Message sent' });
});

// View Messages (GET)
router.get('/viewMessages', (req, res) => {
  res.json(messages);
});

// Socket connection
io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  socket.join(userId);

  console.log(`User ${userId} connected`);

  socket.on('disconnect', () => {
    console.log(`User ${userId} disconnected`);
  });
});

//server.listen(3000, () => console.log('Server is running on port 3000'));


module.exports = router;
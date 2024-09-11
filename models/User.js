const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile: {
    gender: String,
    birthday: String,
    horoscope: String,
    zodiac: String,
    height: String,
    weight: String,
    interests: [String],
  },
});
module.exports = mongoose.model('User', UserSchema);

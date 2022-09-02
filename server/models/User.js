const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  books: [{type: mongoose.Schema.Types.ObjectId, ref: "book"}],
  wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: "book"}]
});



const User = mongoose.model('user', UserSchema);

module.exports = User

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Message = mongoose.model('Message', MessageSchema);
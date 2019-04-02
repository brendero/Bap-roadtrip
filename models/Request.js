const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  requestingUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  invitedUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tripId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  status: {
    type: Boolean,
    default: false,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true
  }
})

module.exports = Request = mongoose.model('Request', requestSchema);
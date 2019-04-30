const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  messages: [
    {
      user: {
        id : {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        name: {
          type: String,
          required: true
        }, 
        avatar: {
          type: String,
          required: true
        }
      },
      body: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Message = mongoose.model('Message', MessageSchema);
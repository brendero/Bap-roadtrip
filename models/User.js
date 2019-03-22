const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { 
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        default: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('User', UserSchema);
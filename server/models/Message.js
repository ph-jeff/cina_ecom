const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    users: Array,
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // recipient_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
}, {timestamps: true})

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
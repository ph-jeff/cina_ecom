const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const Balance = mongoose.model('Balance', balanceSchema);
module.exports = Balance;
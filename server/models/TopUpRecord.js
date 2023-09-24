const mongoose = require('mongoose');

const topUpRecordSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
    }
}, {timestamps: true})

const TopUpRecord = mongoose.model('TopUpRecord', topUpRecordSchema);
module.exports = TopUpRecord;
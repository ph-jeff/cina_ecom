const mongoose = require('mongoose');

const barangaySchema = new mongoose.Schema({
    municipal_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Municipal'
    },
    name: {
        type: String,
    }
})

const Barangay = mongoose.model('Barangay', barangaySchema);
module.exports = Barangay;
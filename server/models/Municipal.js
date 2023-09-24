const mongoose = require('mongoose');

const municipalSchema = new mongoose.Schema({
    province_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Province'
    },
    name: {
        type: String,
    }
})

const Municipal = mongoose.model('Municipal', municipalSchema);
module.exports = Municipal;
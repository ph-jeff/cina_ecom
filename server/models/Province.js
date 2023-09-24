const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
    country_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    name: {
        type: String,
    }
})

const Province = mongoose.model('Province', provinceSchema);
module.exports = Province;
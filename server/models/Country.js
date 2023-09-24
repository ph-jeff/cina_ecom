const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    code: {
        type: String,
    },
    name: {
        type: String,
    }
})

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;
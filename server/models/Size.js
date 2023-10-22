const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    unit_size: {
        type: String,
        required: true,
        unique: true,
    },
    size_list: {
        type: [String]
    },
    slug: {
        type: String,
    },
}, {timestamps: true})

const Size = mongoose.model('Size', sizeSchema);
module.exports = Size;
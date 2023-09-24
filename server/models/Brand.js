const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brand_name: {
        type: String,
        required: true,
        unique: true,
    },
    img_url: {
        type: String,
    },
    slug: {
        type: String,
    },
}, {timestamps: true})

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
    },
}, {timestamps: true})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
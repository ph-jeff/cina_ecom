const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    name: {
        type: String,
    },
},{ timestamps: true });
const ProductVariant = mongoose.model('ProductVariant', variantSchema);
module.exports = ProductVariant;
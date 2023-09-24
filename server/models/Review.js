const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    comment: {
        type: String
    },
    rating: {
        type: String,
        default: 5,
    }
}, { timestamps: true });
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
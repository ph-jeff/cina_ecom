const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number
        }
    }],
    payment: {
        type: String,
    },
    sub_total: {
        type: Number,
    },
    total: {
        type: Number,
    },
    status: {
        type: String,
        default: 'pending',
    },
    destination: {
        type: String,
        // required: true,
    },
},{ timestamps: true });
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
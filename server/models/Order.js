const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{}],
    sub_total: {
        type: Number,
    },
    total: {
        type: Number,
    },
    status: {
        type: String,
        default: 'pending',
    }
},{ timestamps: true });
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
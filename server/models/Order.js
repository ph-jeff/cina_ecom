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
        },
        size: {
            unit_size: {
                type: String,
            },
            selected_size: {
                type: String,
            }
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
    // tracker: {
    //     pending: {
    //         type: Boolean,
    //     },
    //     prepairing: {
    //         type: String
    //     },
    //     to_ship: {
    //         type: String
    //     },
    //     delivered: {
    //         type: String
    //     },
    // }
},{ timestamps: true });
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // order_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Order'
    // },
    url: {
        link: {
            type: String,
        },
        expiredAt: {
            type: Date,
            default: function(){
                const currentDate = new Date();
                return new Date(currentDate.getTime() + 2 * 60 * 1000);
                // return new Date(currentDate.getSeconds() + 5);
            }
        },
        visited: {
            type: Boolean,
            default: false,
        }
    },
    items: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        name: {
            type: String
        },
        price: {
            type: Number
        },
        quantity: {
            type: Number
        }
    }],
    payment: {
        type: String,
    },
    remarks: {
        type: String,
        default: null,
    }
}, { timestamps: true });
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
    remarks: {
        type: String,
        default: null,
    }
}, { timestamps: true });
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
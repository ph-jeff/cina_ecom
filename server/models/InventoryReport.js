const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    action: {
        type: String,
    },
    product_name: {
        type: String,
    },
    beginning_amount: {
        quantity: {
            type: Number,
        },
        price: {
            type: Number,
        }
    },
    difference: {
        quantity: {
            type: Number
        },
        price: {
            type: Number,
        }
    },
    ending_amount: {
        quantity: {
            type: Number,
        },
        price: {
            type: Number,
        }
    },
}, {timestamps: true})

const InventoryReport = mongoose.model('InventoryReport', inventorySchema);
module.exports = InventoryReport;
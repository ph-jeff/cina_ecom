const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
            type: Number,
        },
        size: {
            unit_size: {
                type: String,
            },
            selected_size: {
                type: String,
            }
        }
        // name: {
        //     type: String,
        // },
        // quantity: {
        //     type: Number,
        // },
        // price: {
        //     type: Number,
        // },
        // img_url: {
        //     type: String,
        // },
        // description: {
        //     type: String,
        // },
    }],
    sub_total: {
        type: Number,
    },
    total: {
        type: Number,
    }
},{ timestamps: true });
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;

// cartSchema.pre('save', function (next) {
//     this.items.forEach(item => {
//         this.sub_total += parseInt(item.quantity) * parseInt(item.price);
//     })
//     next();
// });
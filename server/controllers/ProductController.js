const Product = require('../models/Product');
const Transaction = require('../models/Transaction');
const Order = require('../models/Order');
const mongoose = require('mongoose');

const cloudinary = require('../middlewares/fileUploader');
const path = require('path');
const fs = require('fs');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// shared with products on table -> admin page
module.exports.index = async (req, res) => {
    try {
        const query = req.query.value || "";
        const limit = req.query.limit;
        const product = await Product.find(
            {
                is_archived: { $ne: true },
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    // {description: {$regex: query}}
                ]
            }
        ).sort('-createdAt').limit(limit);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.featured = async (req, res) => {
    try {
        const product = await Product.find(
            {
                is_archived: { $ne: true },
                is_featured: true
            }
        ).sort('-createdAt');
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.view = async (req, res) => {
    try {
        const product_id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(404).json({ error: 'No item found' });
        }
        const product = await Product.findById(product_id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.create = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        // Delete the temporary file created by multer
        fs.unlinkSync(req.file.path);

        const { name, quantity, price, category, brand, description, is_featured } = req.body;
        const product = await Product.create({
            name,
            quantity,
            price,
            img_url: result.url,
            category,
            brand,
            description,
            is_featured,
        })

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.get_update = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, quantity, price, category, brand, description, is_featured } = req.body;
        let result = null;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
            fs.unlinkSync(req.file.path);
        }
        const product = await Product.findByIdAndUpdate(id, {
            name,
            quantity,
            price,
            img_url: result && result.url ? result.url : this.img_url,
            category,
            brand,
            description,
            is_featured
        }, { new: true })
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id, { is_archived: true }, { new: true });
        res.status(200).json('remove');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.search = async (req, res) => {
    try {
        const query = req.query.value || "";
        if (query == "") {
            return res.status(400).json(null);
        }
        const product = await Product.find(
            {
                is_archived: { $ne: true },
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { description: { $regex: query } }
                ]
            }
        ).sort('-createdAt');
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.category = async (req, res) => {
    try {
        const query = req.query.value;
        const product = await Product.find({ category: query }).sort('-createdAt');
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// order summary
module.exports.checkout = async (req, res) => {
    try {
        const product_id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(404).json({ error: 'No item found' });
        }
        const product = await Product.findById(product_id);
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const generate_string = require('../utils/generateString')

// place order the item
module.exports.place_order = async (req, res) => {
    try {
        const product_id = req.params.id;
        const user_id = res.locals.userID;
        const { quantity, mode } = req.body;

        if (!mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(404).json({ error: 'No item found' });
        }

        const product = await Product.findById(product_id);

        if (mode == 'e-pay') {
            const transaction = await Transaction.create({
                user_id: user_id,
                url: {
                    link: generate_string(),
                },
                items: [{
                    product_id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity,
                }],
                mode: mode,
            })
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: [{
                    price_data: {
                        currency: 'php',
                        product_data: {
                            name: product.name
                        },
                        unit_amount: 100 * parseInt(product.price),
                    },
                    quantity: quantity,
                }],
                success_url: process.env.STRIPE_SUCCESS_URL + transaction.url.link,
                cancel_url: process.env.STRIPE_CANCELLED_URL + transaction.url.link,
            })
            return res.json({ url: session.url })
        }
        else if(mode == 'cod'){
            const transaction = await Transaction.create({
                user_id: user_id,
                url: {
                    link: generate_string(),
                },
                items: [{
                    product_id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity,
                }],
                mode: mode,
            })
            return res.json({url: process.env.STRIPE_SUCCESS_URL + transaction.url.link})
        }

    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}

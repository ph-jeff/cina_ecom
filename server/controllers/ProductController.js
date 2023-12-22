const Product = require('../models/Product');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');
const slug = require('slug');

const cloudinary = require('../middlewares/fileUploader');
const path = require('path');
const fs = require('fs');
const generate_string = require('../utils/generateString');
const UserDetails = require('../models/UserDetails');
const InventoryReport = require('../models/InventoryReport');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// shared with products on table -> admin page
module.exports.index = async (req, res) => {
    try {
        const query = req.query.value || "";
        const limit = req.query.limit || 0;
        const product = await Product.find(
            {
                quantity: {$ne: 0},
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

module.exports.admin_index = async (req, res) => {
    try {
        const value = req.query.value || "";
        const limit = req.query.limit || 5;
        const page = req.query.page || 0;

        const productCount = await Product.countDocuments({
            $or: [
                { name: { $regex: value, $options: "i" } },
            ]
        });

        const totalPages = Math.ceil(productCount / limit);

        const product = await Product.find(
            {
                $or: [
                    { name: { $regex: value, $options: "i" } },
                ]
            }
        ).sort('-createdAt')
        .skip(limit * page)
        .limit(limit)
        .sort({createdAt: -1});

        const data = {
            product,
            totalPages
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.latest = async (req, res) => {
    try {
        const product = await Product.find({
            quantity: {$ne: 0},
        }).sort({createdAt: -1}).limit(5);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.sale = async (req, res) => {
    try {
        const sale_product = await Product.find({ "sale.is_sale": true, "quantity" : { $ne:0 } });
        res.status(200).json(sale_product);
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
        const {
            name,
            quantity,
            price,
            category,
            brand,
            description,
            is_featured,
            is_sale,
            discount,
            start,
            end
        } = req.body;
        const slug_name = slug(name, '-', {lower: true})
        if(await Product.findOne({slug: slug_name})){
            return res.status(400).json({error: 'Already existed'});
        }
        const result = await cloudinary.uploader.upload(req.file.path);

        // Delete the temporary file created by multer
        fs.unlinkSync(req.file.path);

        const product = new Product({
            name,
            slug: slug_name,
            quantity,
            price,
            img_url: result.url,
            category,
            brand,
            description,
            is_featured,
            sale: {
                is_sale,
                discount,
                start,
                end
            }
        })

        product.save()
        .then(async(result) => {
            const report = new InventoryReport({
                action: 'create',
                product_name: product.name,
                beginning_amount: {
                    quantity: quantity,
                    price: price
                },
                difference: {
                    quantity: quantity - quantity ,
                    price: price - price
                },
                ending_amount: {
                    quantity: quantity,
                    price: price
                }
            });
        
            const savedReport = await report.save();
        })
        .catch(error => {
            console.log("didn't save")
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
        const {
            name,
            quantity,
            price,
            category,
            brand,
            description,
            is_featured,
            is_sale,
            discount,
            start,
            end
        } = req.body;
        const slug_name = slug(name, '-', {lower: true})

        // if(await Product.findOne({slug: slug_name}).count() >= 1){
        //     return res.status(400).json({error: "You are trying to save a data that hasn't change"});
        // }

        let result = null;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
            fs.unlinkSync(req.file.path);
        }

        const current_product = await Product.findById(id);

        const product = await Product.findByIdAndUpdate(id, {
            name,
            slug: slug_name,
            quantity,
            price,
            img_url: result && result.url ? result.url : this.img_url,
            category,
            brand,
            description,
            is_featured,
            sale: {
                is_sale,
                discount,
                start,
                end
            }
        }, { new: true })
        
        const report = new InventoryReport({
            action: 'update',
            product_name: product.name,
            beginning_amount: {
                quantity: current_product.quantity,
                price: current_product.price
            },
            difference: {
                quantity: product.quantity - current_product.quantity,
                price: product.price - current_product.price,
            },
            ending_amount: {
                quantity: product.quantity,
                price: product.price
            },
            difference: {
                quantity: product.quantity - current_product.quantity,
                price: product.price - current_product.price,
            }
        });
    
        const savedReport = await report.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id, { is_archived: true }, { new: true });
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
        const product = await Product.find({
            category: { $regex: '\\b' + query + '\\b', $options: 'i' },
            quantity: { $ne: 0 }
        }).sort('-createdAt');
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports.per_brand = async (req, res) => {
    try {
        const brand_name = req.params.brand_name.replace(/-/g, ' ');
        console.log(brand_name)
        const products = await Product.find({brand: { $regex: brand_name, $options: "i" },})
        console.log(products)
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// order summary
module.exports.checkout = async (req, res) => {
    try {
        const product_id = req.params.id;
        const user_id = res.locals.userID;
        if (!mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(404).json({ error: 'No item found' });
        }
        const user = await UserDetails.findOne({user_id});
        const product = await Product.findById(product_id);
        const data = {
            product,
            user
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// place order the item
module.exports.place_order = async (req, res) => {
    try {
        const product_id = req.params.id;
        const user_id = res.locals.userID;
        const { quantity, mode, unit_size, selected_size } = req.body;

        if (!mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(404).json({ error: 'No item found' });
        }

        const product = await Product.findById(product_id);

        const items = [
            {
                product_id: product.id,
                quantity: quantity,
                size: {
                    unit_size,
                    selected_size
                }
            }
        ]

        console.log(items)

        if (mode == 'e-pay') {
            const transaction = await Transaction.create({
                user_id: user_id,
                url: {
                    link: generate_string(),
                },
                items: items,
                payment: mode,
                order_type: 'quick',
            })
            console.log(transaction)
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: [{
                    price_data: {
                        currency: 'php',
                        product_data: {
                            name: product.name
                        },
                        unit_amount: product.sale.is_sale
                            ? 100 * (product.price - (product.price * (product.sale.discount / 100)))
                            : 100 * product.price
                    },
                    quantity: quantity,
                }],
                success_url: process.env.STRIPE_SUCCESS_URL + transaction.url.link,
                cancel_url: process.env.STRIPE_CANCELLED_URL + transaction.url.link,
            })
            return res.json({ url: session.url })
            // return res.json(transaction)
        }
        else if(mode == 'cod'){
            const transaction = await Transaction.create({
                user_id: user_id,
                url: {
                    link: generate_string(),
                },
                items: items,
                payment: mode,
                order_type: 'quick',
            })
            return res.json({url: process.env.STRIPE_SUCCESS_URL + transaction.url.link})
            // return res.json(transaction)
        }

    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}

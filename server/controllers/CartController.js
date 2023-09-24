const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Transaction = require('../models/Transaction');
const generate_string = require('../utils/generateString')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.cart = async (req, res) => {
    try {
        const user_id = res.locals.userID;
        const cart = await Cart.findOne({user_id: user_id})
        if(!cart){
            return res.json([])
        }
        res.status(200).json(cart.items);
    } catch (error) {
        res.status(404).json(error);
    }
}

module.exports.addcart = async(req, res) => {
    try {
        const product_id = req.params.id;
        const user_id = res.locals.userID;
        const quantity = req.body.quantity;
        const product = await Product.findById(product_id);

        const user_cart = await Cart.findOne({user_id: user_id})
        if(user_cart){
            let itemIndex = user_cart.items.findIndex(p => p.product_id == product_id);
            if(itemIndex > -1){
                let prodItem = user_cart.items[itemIndex];
                if(product.quantity > prodItem.quantity){
                    prodItem.quantity = prodItem.quantity + parseInt(quantity);
                }else{
                    return res.status(400).json({error: 'Too many items on cart'});
                }
            }else{
                user_cart.items.push({
                    product_id: product.id,
                    name: product.name,
                    quantity: quantity,
                    price: product.price,
                    img_url: product.img_url,
                    description: product.description,
                })
            }
            user_cart.save()
            res.status(200).json(user_cart);
        }else{
            const user_cart = await Cart.create({
                user_id: user_id,
                items: [{
                    product_id: product.id,
                    name: product.name,
                    quantity: quantity,
                    price: product.price,
                    img_url: product.img_url,
                    description: product.description,
                }],
            })
            console.log(user_cart)
            res.status(200).json(user_cart);
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message});
    }
}

module.exports.add = async(req, res) => {
    try {
        const product_id = req.params.id;
        const user_id = res.locals.userID;
        const product = await Product.findById(product_id);
        const user_cart = await Cart.findOne({user_id: user_id})
        let itemIndex = user_cart.items.findIndex(p => p.product_id == product_id);
        if(itemIndex > -1){
            let prodItem = user_cart.items[itemIndex];
            if(product.quantity > prodItem.quantity){
                prodItem.quantity = prodItem.quantity + 1;
                user_cart.sub_total = prodItem.quantity * prodItem.price;
                user_cart.save()
                res.status(200).json(user_cart)
            }else{
                res.status(400).json({error: 'Insufficient item'})
            }
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.sub = async(req, res) => {
    try {
        const product_id = req.params.id;
        const user_id = res.locals.userID;
        const user_cart = await Cart.findOne({user_id: user_id})
        let itemIndex = user_cart.items.findIndex(p => p.product_id == product_id);
        if(itemIndex > -1){
            let prodItem = user_cart.items[itemIndex];
            prodItem.quantity = prodItem.quantity - 1;
            user_cart.sub_total = prodItem.quantity * prodItem.price;
            if(prodItem.quantity <= 0){
                user_cart.items.splice(itemIndex, 1)
            }
        }
        user_cart.save()
        res.status(200).json(user_cart)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.remove = async(req, res) => {
    try {
        const product_id = req.params.id;
        const user_id = res.locals.userID;
        const user_cart = await Cart.findOne({user_id: user_id})
        let itemIndex = user_cart.items.findIndex(p => p.product_id == product_id);
        if(itemIndex > -1){
            let prodItem = user_cart.items[itemIndex];
            if(prodItem){
                user_cart.items.splice(itemIndex, 1)
            }
        }
        user_cart.save()
        res.status(200).json(user_cart)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.checkout = async(req, res) => {
    try {
        const user_id = res.locals.userID;
        const mode = req.body.mode;
        const products = await Product.find();
        const cart = await Cart.findOne({user_id});

        if(mode == 'e-pay'){
            const transaction = await Transaction.create({
                user_id: user_id,
                url: {
                    link: generate_string(),
                },
                items: cart.items,
                mode: mode,
            })
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: cart.items.map(item => {
                    return {
                        price_data: {
                            currency: 'php',
                            product_data: {
                                name: item.name
                            },
                            unit_amount: 100 * parseInt(item.price),
                        },
                        quantity: item.quantity,
                    }
                }),
                success_url: process.env.STRIPE_SUCCESS_URL + transaction.url.link,
                cancel_url: process.env.STRIPE_CANCELLED_URL + transaction.url.link,
            })
            return res.json({url: session.url})
        }
        else if(mode == 'cod'){
            const transaction = await Transaction.create({
                user_id: user_id,
                url: {
                    link: generate_string(),
                },
                items: cart.items,
                mode: mode,
            })
            return res.json({url: process.env.STRIPE_SUCCESS_URL + transaction.url.link})
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}
const Order = require('../models/Order')

module.exports.pending = async (req, res) => {
    try {
        const value = req.query.value || "";
        const orders = await Order.find({status: { $regex: 'pending', $options: 'i' }}).populate('items.product_id');
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.to_be_prepared = async (req, res) => {
    try {
        const order_id = req.params.id;
        const orders = await Order.findByIdAndUpdate(order_id, { status: 'prepairing' }, {new: true}).populate('items.product_id')
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.prepairing = async (req, res) => {
    try {
        const query = req.body.query;
        const orders = await Order.find({ status: { $regex: 'prepairing', $options: 'i' }}).populate('items.product_id')
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.to_be_ship = async (req, res) => {
    try {
        const order_id = req.params.id;
        const orders = await Order.findByIdAndUpdate(order_id, { status: 'to-ship' }, {new: true}).populate('items.product_id')
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.to_ship = async (req, res) => {
    try {
        const query = req.body.query;
        const orders = await Order.find({ status: { $regex: 'to-ship', $options: 'i' } }).populate('items.product_id')
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.to_arrive = async(req, res) => {
    try {
        const order_id = req.params.id;
        const orders = await Order.findByIdAndUpdate(order_id, { status: 'delivered' }, {new: true}).populate('items.product_id')
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.completed = async (req, res) => {
    try {
        const query = req.body.query;
        const orders = await Order.find({ status: { $regex: 'delivered', $options: 'i' } }).populate('items.product_id')
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.cancelled = async (req, res) => {
    try {
        const query = req.body.query;
        const orders = await Order.find({ status: { $regex: 'cancelled', $options: 'i' } }).populate('items.product_id')
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
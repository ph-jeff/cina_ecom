const Order = require('../models/Order')

module.exports.pending = async (req, res) => {
    try {
        const value = req.query.value || "";
        const orders = await Order.find({
            status: 'pending',
        }).populate('items.product_id');
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.prepairing = async (req, res) => {
    try {
        const query = req.body.query;
        const orders = await Order.find({ status: 'prepairing' }).populate('items.product_id')
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.to_ship = async (req, res) => {
    try {
        const query = req.body.query;
        const orders = await Order.find({ status: 'to-ship' }).populate('items.product_id')
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.completed = async (req, res) => {
    try {
        const query = req.body.query;
        const orders = await Order.find({ status: 'completed' }).populate('items.product_id')
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
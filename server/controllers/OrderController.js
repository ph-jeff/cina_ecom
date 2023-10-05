const Order = require('../models/Order')

module.exports.pending = async (req, res) => {
    try {
        const value = req.query.value || "";
        const orders = await Order.find({
            status: 'pending',
        });
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.prepairing = async (req, res) => {
    try {
        const query = req.body.query;
        const orders = await Order.find({ status: 'prepairing' })
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.to_ship = async (req, res) => {
    try {
        const query = req.body.query;
        const orders = await Order.find({ status: 'to-ship' })
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.completed = async (req, res) => {
    try {
        const query = req.body.query;
        const orders = await Order.find({ status: 'completed' })
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const Order = require('../models/Order')

module.exports.pending = async (req, res) => {
    try {
        const value = req.query.value || "";
        const limit = req.query.limit || 5;
        const page = req.query.page || 0;

        const orderCount = await Order.countDocuments({
            status: { $regex: 'pending', $options: 'i' }
        });

        const totalPages = Math.ceil(orderCount / limit);

        const orders = await Order.find({
            status: { $regex: 'pending', $options: 'i' }
        }).populate('items.product_id')
        .skip(limit * page)
        .limit(limit)
        .sort({createdAt: -1});

        const data = {
            orders,
            totalPages,
        }

        res.json(data)
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
        const value = req.query.value || "";
        const limit = req.query.limit || 5;
        const page = req.query.page || 0;

        const orderCount = await Order.countDocuments({
            status: { $regex: 'prepairing', $options: 'i' }
        });

        const totalPages = Math.ceil(orderCount / limit);
        
        const orders = await Order.find({
            status: { $regex: 'prepairing', $options: 'i' }
        }).populate('items.product_id')
        .skip(limit * page)
        .limit(limit)
        .sort({createdAt: -1});

        const data = {
            orders,
            totalPages
        }

        res.json(data)
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
        const value = req.query.value || "";
        const limit = req.query.limit || 5;
        const page = req.query.page || 0;

        const orderCount = await Order.countDocuments({
            status: { $regex: 'to-ship', $options: 'i' }
        });

        const totalPages = Math.ceil(orderCount / limit);
        
        const orders = await Order.find({
            status: { $regex: 'to-ship', $options: 'i' }
        }).populate('items.product_id')
        .skip(limit * page)
        .limit(limit)
        .sort({createdAt: -1});

        const data = {
            orders,
            totalPages
        }
        res.json(data)
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
        const value = req.query.value || "";
        const limit = req.query.limit || 5;
        const page = req.query.page || 0;

        const orderCount = await Order.countDocuments({
            status: { $regex: 'delivered', $options: 'i' }
        });

        const totalPages = Math.ceil(orderCount / limit);

        const orders = await Order.find({
            status: { $regex: 'delivered', $options: 'i' }
        }).populate('items.product_id')
        .skip(limit * page)
        .limit(limit)
        .sort({createdAt: -1});

        const data = {
            orders,
            totalPages
        }

        res.json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.cancelled = async (req, res) => {
    try {
        const value = req.query.value || "";
        const limit = req.query.limit || 5;
        const page = req.query.page || 0;

        const orderCount = await Order.countDocuments({
            status: { $regex: 'cancelled', $options: 'i' }
        });

        const totalPages = Math.ceil(orderCount / limit);

        const orders = await Order.find({
            status: { $regex: 'cancelled', $options: 'i' }
        }).populate('items.product_id')
        .skip(limit * page)
        .limit(limit)
        .sort({createdAt: -1});

        const data = {
            orders,
            totalPages
        }

        res.json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
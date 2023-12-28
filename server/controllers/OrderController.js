const Order = require('../models/Order')
const Product = require('../models/Product')

module.exports.pending = async (req, res) => {
    try {
        const value = req.query.value || "";
        const limit = req.query.limit || 5;
        const page = req.query.page || 0;
        const date_from = req.query.date_from || "1994-11-20T00:00:00.000Z";

        const defaultDateTo = new Date("9999-12-31T23:59:59.999Z");
        const date_to = req.query.date_to ? new Date(req.query.date_to) : defaultDateTo;

        console.log(new Date(date_from))

        const orderCount = await Order.countDocuments({
            status: { $regex: 'pending', $options: 'i' },
            updatedAt: {
                $gte: new Date(date_from),
                $lt: date_to
            }
        });

        const totalPages = Math.ceil(orderCount / limit);

        const orders = await Order.find({
            status: { $regex: 'pending', $options: 'i' },
            updatedAt: {
                $gte: new Date(date_from),
                $lt: date_to
            }
        }).populate('items.product_id')
        .skip(limit * page)
        .limit(limit)
        .sort({updatedAt: 1});

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
        const order = await Order.findById(order_id).populate('items.product_id');

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        for (const item of order.items) {
            if (item.quantity > item.product_id.quantity) {
                throw new Error('Ordered quantity exceeds remaining quantity for an item');
            }
        }

        const updatedOrder = await Order.findByIdAndUpdate(order_id, {status: 'prepairing'}, {new: true}).populate('items.product_id');

        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.prepairing = async (req, res) => {
    try {
        const value = req.query.value || "";
        const limit = req.query.limit || 5;
        const page = req.query.page || 0;
        const date_from = req.query.date_from || "1994-11-20T00:00:00.000Z";

        const defaultDateTo = new Date("9999-12-31T23:59:59.999Z");
        const date_to = req.query.date_to ? new Date(req.query.date_to) : defaultDateTo;

        const orderCount = await Order.countDocuments({
            status: { $regex: 'prepairing', $options: 'i' },
            updatedAt: {
                $gte: new Date(date_from),
                $lt: date_to
            }
        });

        const totalPages = Math.ceil(orderCount / limit);
        
        const orders = await Order.find({
            status: { $regex: 'prepairing', $options: 'i' },
            updatedAt: {
                $gte: new Date(date_from),
                $lt: date_to
            }
        }).populate('items.product_id')
        .skip(limit * page)
        .limit(limit)
        .sort({updatedAt: 1});

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
        // const orders = await Order.findByIdAndUpdate(order_id, { status: 'to-ship' }, {new: true}).populate('items.product_id')
        const order = await Order.findById(order_id).populate('items.product_id');

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        for (const item of order.items) {
            if (item.quantity > item.product_id.quantity) {
                throw new Error('Ordered quantity exceeds remaining quantity for an item');
            }
        }

        const updatedOrder = await Order.findByIdAndUpdate(order_id, {status: 'to-ship'}, {new: true}).populate('items.product_id');

        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.to_ship = async (req, res) => {
    try {
        const value = req.query.value || "";
        const limit = req.query.limit || 5;
        const page = req.query.page || 0;
        const date_from = req.query.date_from || "1994-11-20T00:00:00.000Z";

        const defaultDateTo = new Date("9999-12-31T23:59:59.999Z");
        const date_to = req.query.date_to ? new Date(req.query.date_to) : defaultDateTo;

        console.log(date_to)
        const orderCount = await Order.countDocuments({
            status: { $regex: 'to-ship', $options: 'i' },
            updatedAt: {
                $gte: new Date(date_from),
                $lt: date_to
            }
        });

        const totalPages = Math.ceil(orderCount / limit);
        
        const orders = await Order.find({
            status: { $regex: 'to-ship', $options: 'i' },
            updatedAt: {
                $gte: new Date(date_from),
                $lt: date_to
            }
        }).populate('items.product_id')
        .skip(limit * page)
        .limit(limit)
        .sort({updatedAt: 1});

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
        // const orders = await Order.findByIdAndUpdate(order_id, { status: 'delivered' }, {new: true}).populate('items.product_id');
        const order = await Order.findById(order_id).populate('items.product_id');

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
    
        // Check if ordered quantity exceeds remaining quantity for any item
        for (const item of order.items) {
            if (item.quantity > item.product_id.quantity) {
                throw new Error('Ordered quantity exceeds remaining quantity for an item');
            }
        }
    
        // Update product quantities and set order status
        const updateOperations = order.items.map(item => ({
            updateOne: {
                filter: { _id: item.product_id._id },
                update: { $inc: { quantity: -item.quantity } },
            },
        }));
        
        // Use bulkWrite for atomic updates
        await Product.bulkWrite(updateOperations);
    
        // Use bulkWrite for atomic updates
        const updatedOrder = await Order.findByIdAndUpdate(order._id, { $set: { status: 'delivered' } }, { new: true }).populate('items.product_id');
    
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.completed = async (req, res) => {
    try {
        const value = req.query.value || "";
        const limit = req.query.limit || 5;
        const page = req.query.page || 0;
        const date_from = req.query.date_from || "1994-11-20T00:00:00.000Z";

        const defaultDateTo = new Date("9999-12-31T23:59:59.999Z");
        const date_to = req.query.date_to ? new Date(req.query.date_to) : defaultDateTo;

        const orderCount = await Order.countDocuments({
            status: { $regex: 'delivered', $options: 'i' },
            // items: {
            //     $elemMatch: {
            //         product_id: { $exists: true },
            //         'product_id.name': { $regex: value, $options: 'i' },
            //     },
            // },
            updatedAt: {
                $gte: new Date(date_from),
                $lt: date_to
            }
        }).populate('items.product_id');

        const totalPages = Math.ceil(orderCount / limit);

        const orders = await Order.find({
            status: { $regex: 'delivered', $options: 'i' },
            // items: {
            //     $elemMatch: {
            //         product_id: { $exists: true },
            //         'product_id.name': { $regex: value, $options: 'i' },
            //     },
            // },
            updatedAt: {
                $gte: new Date(date_from),
                $lt: date_to
            }
        }).populate('items.product_id')
        .skip(limit * page)
        .limit(limit)
        .sort({updatedAt: 1});

        const data = {
            orders,
            totalPages
        }

        res.json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.cancelling = async(req, res) => {
    try {
        const order_id = req.params.id;
        const orders = await Order.findByIdAndUpdate(order_id, { status: 'cancelled' }, {new: true}).populate('items.product_id')
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.cancelled = async (req, res) => {
    try {
        const value = req.query.value || "";
        const limit = req.query.limit || 5;
        const page = req.query.page || 0;
        const date_from = req.query.date_from || "1994-11-20T00:00:00.000Z";

        const defaultDateTo = new Date("9999-12-31T23:59:59.999Z");
        const date_to = req.query.date_to ? new Date(req.query.date_to) : defaultDateTo;

        const orderCount = await Order.countDocuments({
            status: { $regex: 'cancelled', $options: 'i' },
            updatedAt: {
                $gte: new Date(date_from),
                $lt: date_to
            }
        });

        const totalPages = Math.ceil(orderCount / limit);

        const orders = await Order.find({
            status: { $regex: 'cancelled', $options: 'i' },
            updatedAt: {
                $gte: new Date(date_from),
                $lt: date_to
            }
        }).populate('items.product_id')
        .skip(limit * page)
        .limit(limit)
        .sort({updatedAt: 1});

        const data = {
            orders,
            totalPages
        }

        res.json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
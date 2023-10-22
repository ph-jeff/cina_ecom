const Order = require('../models/Order');

module.exports.index = async(req, res) => {
    try {
        const from = new Date('2023-09-01T00:00:00.000Z');
        const to = new Date('2023-10-30T23:59:59.999Z');
        const orders = await Order.find({
            updatedAt: {
                $gte: from,
                $lte: to
            }
        }).populate('items.product_id')
        res.json(orders)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
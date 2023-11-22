const Order = require('../models/Order');
const User = require('../models/User');

module.exports.index = async (req, res) => {
    try {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const current_sales = await Order.aggregate([
            {
                $match: {
                    status: 'delivered',
                    // Compare against the first and last day of the month
                    updatedAt: {
                        $gte: firstDayOfMonth,
                        $lte: lastDayOfMonth
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    subtotal: { $sum: '$sub_total' }
                }
            }
        ]);

        const current_amount = current_sales.length > 0 ? current_sales[0].subtotal : 0;

        console.log(current_amount);

        const from = new Date('2023-09-01T00:00:00.000Z');
        const to = new Date('2023-10-30T23:59:59.999Z');
        const orders = await Order.find({
            updatedAt: {
                $gte: from,
                $lte: to
            }
        }).populate('items.product_id')

        const total_sales = await Order.aggregate([
            {
                $match: {
                    status: 'delivered'
                }
            },
            {
                $group: {
                    _id: null,
                    subtotal: { $sum: '$sub_total' }
                }
            }
        ]);

        // Access the subtotal from the result
        const total_amount = total_sales.length > 0 ? total_sales[0].subtotal : 0;
        // count the total order
        const total_order = await Order.find().count()
        // pending order
        const pending_order = await Order.find({status: 'pending'}).count()
        // count the number of customer
        const total_customers = await User.find({ account_type: { $ne: 'admin' } }).count()

        const data = {
            total_sales: total_amount,
            monthly_sales: current_amount,
            total_order,
            pending_order,
            total_customers,
        }
        res.json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
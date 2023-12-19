const Order = require('../models/Order');
const User = require('../models/User');
const moment = require('moment');

module.exports.index = async (req, res) => {
    try {
        const TODAY = new Date();
        // current month
        const firstDayOfMonth = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
        const lastDayOfMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 0);

        // First and last day of the previous month
        const firstDayOfPreviousMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, 1);
        const lastDayOfPreviousMonth = new Date(TODAY.getFullYear(), TODAY.getMonth(), 0);

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

        // Get sales data for the previous month
        const previous_sales = await Order.aggregate([
            {
                $match: {
                    status: 'delivered',
                    updatedAt: {
                        $gte: firstDayOfPreviousMonth,
                        $lte: lastDayOfPreviousMonth
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
        const previous_amount = previous_sales.length > 0 ? previous_sales[0].subtotal : 0;

        // calculate month_over_month sales
        const current = current_amount * 0.1;
        const previous = previous_amount * 0.1;
        const gain_loss = current - previous; 

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
        const total_customers = await User.find({ account_type: { $ne: 'admin' } }).count();

        // fetch orders base on the current year
        const CURRENT_YEAR = new Date().getFullYear();
        const YEARLY_SALES = await Order.find({
            createdAt: {
                $gte: new Date(CURRENT_YEAR, 0, 1),
            }
        });
        
        // calculating the sales for the current year
        const SALES_DATA = Array.from({ length: 12 }, (_, i) => {
            const monthStart = moment().month(i).startOf('month');
            const monthEnd = moment().month(i).endOf('month');
        
            const salesForMonth = YEARLY_SALES.filter(order => moment(order.createdAt).isBetween(monthStart, monthEnd));
            // console.log(salesForMonth);
            const totalSales = salesForMonth.reduce((sum, order) => sum + order.sub_total, 0);
        
            return {
                month: monthStart.format('MMM'),
                sales: totalSales.toFixed(2), // Adjust the decimal places as needed
            };
        });

        const data = {
            total_sales: total_amount,
            monthly_sales: current_amount,
            month_over_month: gain_loss.toFixed(2),
            total_order,
            pending_order,
            total_customers,
            sales_data: SALES_DATA,
        }
        res.json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
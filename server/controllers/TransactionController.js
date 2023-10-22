const Transaction = require('../models/Transaction');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const UserDetails = require('../models/UserDetails');

module.exports.index = async (req, res) => {
    try {
        const transaction = await Transaction.find();
        res.status(200).json(transaction)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.success = async (req, res) => {
    try {
        const user_id = res.locals.userID;
        const user = await UserDetails.findOne({user_id})
        const { link } = req.params;

        const transaction = await Transaction.findOne({ 'url.link': link, user_id }).populate('items.product_id').populate('user_id')
        // console.log(transaction.items)

        if (!transaction) {
            return res.status(404).json({ error: 'No Transaction Found' })
        }

        if(transaction.url.expiredAt < new Date()){
            return res.status(400).json({error: 'Expired'})
        }

        // if(transaction.url.visited){
        //     return res.status(400).json({error: 'Expired'})
        // }

        if(!transaction.url.visited){
            let sub_total = 0;
            transaction.items.forEach(item => {
                sub_total = item.product_id.sale.is_sale
                    ? sub_total + item.product_id.price - (item.product_id.price * (item.product_id.sale.discount / 100))
                    : sub_total + item.product_id.price;
            })
            console.log(sub_total)
            const order = await Order({
                user_id: user_id,
                items: transaction.items,
                payment: transaction.payment,
                sub_total: sub_total,
                destination: `${user.house_number} ${user.zip_code} ${user.barangay} ${user.municipal} ${user.province}`
            })
            await order.save()
            console.log(order)
        }

        if(transaction.order_type === 'cart'){
            await Cart.findOneAndDelete({user_id});
        }

        // automatically set as visited once cancelled or success
        transaction.remarks = 'SUCCESS';
        transaction.url.visited= true;
        transaction.save()

        res.status(200).json(transaction)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.cancelled = async (req, res) => {
    try {
        const user_id = res.locals.userID;
        const { link } = req.params;

        const transaction = await Transaction.findOne({ 'url.link': link, user_id })

        if (!transaction) {
            return res.status(404).json({ error: 'No Transaction Found' })
        }

        if(transaction.url.expiredAt < new Date()){
            return res.status(400).json({error: 'The link you are trying to access is expired'})
        }

        // automatically set as visited once cancelled or success
        transaction.remarks = 'CANCELLED';
        transaction.url.visited= true;
        transaction.save()

        res.json(transaction.items)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
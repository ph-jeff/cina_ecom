const Transaction = require('../models/Transaction');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

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
        const { link } = req.params;

        const transaction = await Transaction.findOne({ 'url.link': link, user_id }).populate('items.product_id')
        console.log(transaction)

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
            const order = await Order({
                user_id: user_id,
                items: transaction.items,
                payment: transaction.payment,
            })
            await order.save()
            console.log(order)
        }

        await Cart.findOneAndDelete({user_id});

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
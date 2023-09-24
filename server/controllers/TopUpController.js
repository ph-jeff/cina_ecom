const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Balance = require('../models/Balance');
const TopUpRecord = require('../models/TopUpRecord');

module.exports.balance = async(req, res) => {
    try {
        const user_id = res.locals.userID;
        const balance = await Balance.findOne({user_id})
        res.json(balance);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.deposit = async (req, res) => {
    try {
        const {amount} = req.body;
        const user_id = res.locals.userID;
        const balance = await Balance.findOneAndUpdate({user_id}, {
            $inc: { amount: amount }
        }
        , {new: true})
        const top_up = await TopUpRecord.create({
            user_id,
            amount,
        })
        res.json(balance);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.top_up_records = async(req, res) => {
    try {
        const user_id = res.locals.userID;
        const top_up = await TopUpRecord.find({user_id})
        console.log(top_up)
        res.json(top_up);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const Balance = require("../models/Balance");
const User = require("../models/User");
const UserDetails = require('../models/UserDetails');

module.exports.account = async(req, res) => {
    try {
        const userD_id = res.locals.userID;
        const userdetails = await UserDetails.findOne({user_id: userD_id}).populate('user_id');
        res.json({userdetails});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.update = async(req, res) => {
    try {
        const user_id = res.locals.userID;
        const { firstname, middlename, lastname, contact, address } = req.body;
        if(!firstname || !lastname || !contact || !address){
            return res.status(400).json({error: 'Required field must be filled'});
        }
        const user = await UserDetails.findOneAndUpdate({user_id: user_id}, {
            firstname,
            middlename,
            lastname,
            contact,
            address,
        }, {new: true})
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
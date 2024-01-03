const Balance = require("../models/Balance");
const User = require("../models/User");
const UserDetails = require('../models/UserDetails');
const bcrypt = require('bcrypt');
const salt = parseInt(process.env.SALT);
const validator = require('validator');

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
        const { firstname, middlename, lastname, contact, house_number, street_address, zip_code, province, municipal, barangay } = req.body;
        console.log(req.body)
        if(!firstname || !lastname || !contact){
            return res.status(400).json({error: 'Required field must be filled'});
        }
        const user = await UserDetails.findOneAndUpdate({user_id: user_id}, {
            firstname,
            middlename,
            lastname,
            contact,
            house_number,
            street_address,
            zip_code,
            province: province ? province : this.province,
            municipal: municipal ? municipal : this.municipal,
            barangay: barangay ? barangay : this.barangay,
        }, {new: true})
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports.update_password = async(req, res) => {
    try {
        const user_id = res.locals.userID;
        const { current_password, new_password, confirm_password } = req.body;
        if(!current_password || !new_password || !confirm_password){
            return res.status(400).json({error: 'Required field must be filled'});
        }
        
        const current = await bcrypt.hash(current_password, salt);
        const user = await User.findById(user_id);

        const matched = await bcrypt.compare(current_password, user.password)
        if(!matched){
            return res.status(400).json({error: "Current password didn't match"})
        }

        if(new_password !== confirm_password){
            return res.status(400).json({error: "Your new password and confirm password doesn't match"})
        }

        if(!validator.isStrongPassword(new_password)){
            return res.status(400).json({error: "Please enter a strong password"})
        }

        user.password = await bcrypt.hash(new_password, salt);
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
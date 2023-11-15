const User = require("../models/User");
const UserDetails = require('../models/UserDetails');
const Balance = require("../models/Balance");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const salt = parseInt(process.env.SALT);
const secret = process.env.SECRET_KEY;

const maxAge = 24 * 60 * 60 * 1000;

const createToken = (id, email) => {
    return jwt.sign({id, email}, secret, { expiresIn: maxAge });
}

module.exports.register = async(req, res) => {
    const {
        firstname,
        middlename,
        lastname, contact,
        house_number,
        zip_code,
        barangay,
        municipal,
        province,
        email,
        password
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        if(!email || !password || !firstname || !middlename || !lastname || !contact){
            return res.status(400).json({error: "Please fill out all fields"})
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({error: "Invalid email"})
        }

        if(!validator.isStrongPassword(password)){
            return res.status(400).json({error: "Please enter a strong password"})
        }

        const exist = await User.findOne({email})
        if(exist){
            return res.status(400).json({error: "Email is already in used"})
        }

        const user = new User({
            email,
            password: hashedPassword,
        });
    
        const information = new UserDetails({
            user_id: user.id,
            firstname,
            middlename,
            lastname,
            contact,
            house_number,
            zip_code,
            barangay,
            municipal,
            province,
        });

        await information.save();
        await user.save();

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.check_email = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({email});
        console.log(user);
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.login = async(req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({error: "Please fill out all the fields"});
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({error: "Invalid email"})
        }
        
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(400).json({error: "No email found"});
        }
        
        const passwordMatched = await bcrypt.compare(password, user.password)
        if(!passwordMatched){
            return res.status(400).json({error: "The password didn't match"});
        }

        const token = createToken(user._id, user.email);
        // res.cookie('u_token', token, { httpOnly: true, secure: true, maxAge: maxAge * 1000 }).status(200).json({user});

        // for testing
        const data = {
            token,
            user,
        }
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        res.cookie('u_token', token, { httpOnly: true, sameSite: 'None', secure: true, expires: expirationDate }).status(200).json(data);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports.logout = async (req, res) => {
    res.cookie('u_token', '', {maxAge: 1}).status(200).json('logout')
}

module.exports.profile = async (req, res) => {
    const token = req.cookies.u_token;
    if(token){
        jwt.verify(token, secret, {}, (err, user) => {
            if(err){
                throw err;
            }
            console.log(user);
            res.status(200).json(user)
        })
    }else{
        res.json(null)
    }
}
const User = require("../models/User");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const salt = parseInt(process.env.SALT);
const secret = process.env.SECRET_KEY;

const maxAge = 24 * 60 * 60; // 1 days
const createToken = (id, email) => {
    return jwt.sign({id, email}, secret, { expiresIn: '3d' });
}

module.exports.register = async(req, res) => {
    try {
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, salt);

        if(!email || !password){
            return res.status(400).json({error: "Please fill out all fields"})
        }

        // if(!validator.isEmail(email)){
        //     return res.status(400).json({error: "Invalid email"})
        // }

        // if(!validator.isStrongPassword(password)){
        //     return res.status(400).json({error: "Please enter a strong password"})
        // }

        const exist = await User.findOne({email})
        if(exist){
            return res.status(400).json({error: "Email is already in used"})
        }

        const user = await User.create({
            email,
            password: hashedPassword,
            account_type : 'admin'
        });

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

        // if(!validator.isEmail(email)){
        //     return res.status(400).json({error: "Invalid email"})
        // }
        
        const user = await User.findOne({email: email})

        if(user && user.account_type === 'user'){
            return res.status(401).json({error: "Unauthorize"});
        }

        if(!user){
            return res.status(400).json({error: "No email found"});
        }
        const passwordMatched = await bcrypt.compare(password, user.password)
        if(!passwordMatched){
            return res.status(400).json({error: "The password didn't match"});
        }

        const token = createToken(user._id, user.email);
        res.cookie('a_token', token, { httpOnly: true, secure: true, maxAge: maxAge * 1000 }).status(200).json({user});

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports.logout = async (req, res) => {
    res.cookie('a_token', '', {maxAge: 1}).status(200).json('logout')
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
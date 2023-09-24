const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    account_type: {
        type: String,
        default: 'user',
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;

const bcrypt = require('bcrypt');
const salt = parseInt(process.env.SALT);

async function createUser(){
    try {
        const hashed = await bcrypt.hash('password', salt);
        const user = await User.create({
            email: 'Admin',
            password:  hashed,
            account_type: 'admin',
        })
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}

// createUser();
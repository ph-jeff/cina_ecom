const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstname: {
        type: String,
        required: true,
    },
    middlename: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);
module.exports = UserDetails;
const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstname: {
        type: String,
        required: [true, 'first name should not be empty'],
    },
    middlename: {
        type: String,
    },
    lastname: {
        type: String,
        required: [true, 'last name should not be empty'],
    },
    contact: {
        type: String,
        required: [true, 'contact number should not be empty'],
    },
    house_number: {
        type: String,
        required: [true, 'house number should not be empty'],
    },
    street_address: {
        type: String,
        required: [true, 'house number should not be empty'],
    },
    zip_code: {
        type: String,
        required: [true, 'zip code should not be empty'],
    },
    barangay: {
        type: String,
        required: [true, 'barangay should not be empty'],
    },
    municipal: {
        type: String,
        required: [true, 'municipal should not be empty'],
    },
    province: {
        type: String,
        required: [true, 'province should not be empty'],
    },
}, { timestamps: true });

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);
module.exports = UserDetails;
const User = require('../models/User')
const UserDetails = require('../models/UserDetails')

module.exports.user = async(req, res) => {
    try {
        const query = req.query.value || "";
        const user = await User.find(
            {
                account_type: {$ne: 'admin'},
                $or: [
                    {email: {$regex: query, $options: "i"}},
                ]
            }
        );
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
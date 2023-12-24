const User = require('../models/User')
const UserDetails = require('../models/UserDetails')

module.exports.user = async(req, res) => {
    try {
        const value = req.query.value || "";
        const limit = req.query.limit || 5;
        const page = req.query.page || 0;
        const date_from = req.query.date_from || "1994-11-20T00:00:00.000Z";

        const defaultDateTo = new Date("9999-12-31T23:59:59.999Z");
        const date_to = req.query.date_to ? new Date(req.query.date_to) : defaultDateTo;
        const query_data = {
            createdAt: {
                $gte: new Date(date_from),
                $lt: date_to
            },
            $or: [
                {email: {$regex: value, $options: "i"}},
            ]
        }

        const userCount = await User.countDocuments(query_data);

        const totalPages = Math.ceil(userCount / limit);
        
        const users = await User.find(query_data)
        .skip(limit * page)
        .limit(limit)
        .sort({createdAt: -1});

        const data = {
            users,
            totalPages
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
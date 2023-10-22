const Message = require("../models/Message");
const User = require("../models/User");

module.exports.create = async(req, res) => {
    try {
        const admin_id = res.locals.userID;
        const { new_message, to } = req.body

        const message = await Message({
            message: new_message,
            users: [admin_id, to],
            sender_id: admin_id,
        })

        await message.save()

        return res.json(message)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
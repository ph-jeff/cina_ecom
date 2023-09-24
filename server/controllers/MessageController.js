const Message = require("../models/Message");
// const slug = require('slug');

module.exports.index = async(req, res) => {
    try {
        const user_id = res.locals.userID;
        const messages = await Message.find({sender_id: user_id})
        // console.log(messages)
        res.json(messages)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.create = async(req, res) => {
    try {
        const user_id = res.locals.userID;
        console.log(user_id)
        const new_message = req.body.message;
        const messages = await Message.create({
            message: new_message,
            sender_id: user_id,
        })
        // console.log(messages)
        res.json(messages)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const Message = require("../models/Message");
const User = require("../models/User");

// module.exports.index = async(req, res) => {
//     try {
//         const user_id = res.locals.userID;
//         const admin = await User.findOne()
//         if(!admin){
//             return res.status(400).json({error: "The user you are trying to send a message is unavailable"})
//         }
//         const messages = await Message.find({sender_id: user_id}).sort({createdAt: -1})
//         res.json(messages)
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }

module.exports.index = async(req, res) => {
    try {
        const user_id = res.locals.userID;
        const admin = await User.findOne()
        if(!admin){
            return res.status(400).json({error: "The user you are trying to send a message is unavailable"})
        }
        const messages = await Message.find({
            users: {
                $all: [user_id, admin.id]
            }
        }).sort({createdAt: -1})

        console.log(messages)

        const distributedMessage = messages.map((message) => {
            return {
                fromSelf: message.sender_id.toString() === user_id,
                message: message.message
            }
        })
        res.json(distributedMessage)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.create = async(req, res) => {
    try {
        const user_id = res.locals.userID;
        const { new_message, to } = req.body

        const admin = await User.findOne()

        if(!admin){
            return res.status(400).json({error: "The user you are trying to send a message is unavailable"})
        }

        const message = await Message({
            message: new_message,
            users: [user_id, admin.id],
            sender_id: user_id,
        })

        await message.save()

        return res.json(message)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
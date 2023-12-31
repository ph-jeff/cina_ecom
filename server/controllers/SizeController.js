const Size = require("../models/Size");
const slug = require('slug');

module.exports.view = async(req, res) => {
    try {
        const query = req.query.value || "";
        const size = await Size.find({
            $or: [
                { unit_size: { $regex: query, $options: "i" } },
            ]
        })
        res.json(size)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.create = async(req, res) => {
    try {
        const size_origin = req.body.size_origin;
        const slug_name = slug(size_origin, '-', {lower: true})
        const exist = await Size.findOne({slug: slug_name})
        if(exist){
            return res.status(400).json({error: 'Already Exist'})
        }
        const size = await Size.create({
            unit_size: size_origin,
            slug: slug_name,
        })
        res.json(size)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.update = async(req, res) => {
    try {
        const size_id = req.params.id;
        const size_origin = req.body.size_origin;
        const slug_name = slug(size_origin, '-', {lower: true})
        const size = await Size.findByIdAndUpdate(size_id, {
            unit_size: size_origin,
            slug: slug_name,
        }, {new: true})
        res.json(size)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
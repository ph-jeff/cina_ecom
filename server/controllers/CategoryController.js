const Category = require("../models/Category");
const slug = require('slug');

module.exports.view = async(req, res) => {
    try {
        const category = await Category.find()
        res.json(category)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.create = async(req, res) => {
    try {
        const category_name = req.body.category_name;
        const slug_name = slug(category_name, '-', {lower: true})
        const exist = await Category.findOne({slug: slug_name})
        if(exist){
            return res.status(400).json({error: 'Already Exist'})
        }
        const category = await Category.create({
            category_name: category_name,
            slug: slug_name,
        })
        res.json(category)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.update = async(req, res) => {
    try {
        const category_id = req.params.id;
        const category_name = req.body.category_name;
        const slug_name = slug(category_name, '-', {lower: true})
        const category = await Category.findByIdAndUpdate(category_id,{
            category_name: category_name,
            slug: slug_name,
        }, {new: true})
        res.json(category)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
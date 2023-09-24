const Brand = require("../models/Brand");
const slug = require('slug');

module.exports.view = async(req, res) => {
    try {
        const brand = await Brand.find()
        res.json(brand)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.create = async(req, res) => {
    try {
        
        const brand_name = req.body.brand_name;
        const slug_name = slug(brand_name, '-', {lower: true})
        const exist = await Brand.findOne({slug: slug_name})
        if(exist){
            return res.status(400).json({error: 'Already Exist'})
        }
        
        const brand = await Brand.create({
            brand_name: brand_name,
            slug: slug_name,
        })
        
        res.json(brand)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.update = async(req, res) => {
    try {
        const brand_id = req.params.id;
        const brand_name = req.body.brand_name;
        const slug_name = slug(brand_name, '-', {lower: true})
        const brand = await Brand.findByIdAndUpdate(brand_id, {
            brand_name: brand_name,
            slug: slug_name,
        }, {new: true})
        res.json(brand)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
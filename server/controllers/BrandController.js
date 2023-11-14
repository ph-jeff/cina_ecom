const Brand = require("../models/Brand");
const slug = require('slug');
const cloudinary = require('../middlewares/fileUploader');
const path = require('path');
const fs = require('fs');

module.exports.view = async(req, res) => {
    try {
        const query = req.query.value || "";
        const brand = await Brand.find({
            $or: [
                { brand_name: { $regex: query, $options: "i" } },
            ]
        })
        res.json(brand)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.create = async(req, res) => {
    try {
        console.log(req.body)
        const image = await cloudinary.uploader.upload(req.file.path);
        const brand_name = req.body.brand_name;
        const slug_name = slug(brand_name, '-', {lower: true})
        const exist = await Brand.findOne({slug: slug_name})
        if(exist){
            return res.status(400).json({error: 'Already Exist'})
        }
        
        const brand = new Brand({
            brand_name: brand_name,
            img_url: image.url,
            slug: slug_name,
        })

        await brand.save();
        console.log(brand)
        
        res.json(brand)
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

module.exports.update = async(req, res) => {
    try {
        let image = null;
        if (req.file) {
            image = await cloudinary.uploader.upload(req.file.path);
            fs.unlinkSync(req.file.path);
        }
        const brand_id = req.params.id;
        const brand_name = req.body.brand_name;
        const slug_name = slug(brand_name, '-', {lower: true})
        const brand = await Brand.findByIdAndUpdate(brand_id, {
            brand_name: brand_name,
            img_url: image && image.url ? image.url : this.img_url,
            slug: slug_name,
        }, {new: true})
        res.json(brand)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
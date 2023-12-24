const Brand = require("../models/Brand");
const slug = require('slug');
const cloudinary = require('../middlewares/fileUploader');
const path = require('path');
const fs = require('fs');

module.exports.view = async(req, res) => {
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
                { brand_name: { $regex: value, $options: "i" } },
            ]
        }

        const brandCount = await Brand.countDocuments(query_data);

        const totalPages = Math.ceil(brandCount / limit);

        const brand = await Brand.find(query_data)
        .skip(limit * page)
        .limit(limit)
        .sort({createdAt: -1});
        
        const data = {
            brand,
            totalPages
        }

        res.json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.list = async(req, res) => {
    try {
        const brand = await Brand.find()
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
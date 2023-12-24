const Category = require("../models/Category");
const slug = require('slug');

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
                { category_name: { $regex: value, $options: "i" } },
            ]
        }

        const categoryCount = await Category.countDocuments(query_data);

        const totalPages = Math.ceil(categoryCount / limit);

        const category = await Category.find(query_data)
        .skip(limit * page)
        .limit(limit)
        .sort({createdAt: -1});

        const data = {
            category,
            totalPages
        }
        
        res.json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.list = async(req, res) => {
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
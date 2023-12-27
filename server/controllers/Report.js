const InventoryReport = require("../models/InventoryReport")
const Order = require("../models/Order");
const UserDetails = require("../models/UserDetails");

module.exports.inventory = async(req, res) => {
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
                { product_name: { $regex: value, $options: "i" } },
            ]
        }

        const inventoryCount = await InventoryReport.countDocuments(query_data);

        const totalPages = Math.ceil(inventoryCount / limit);

        const inventory = await InventoryReport.find(query_data)
        .skip(limit * page)
        .limit(limit)
        .sort({createdAt: -1});

        const data = {
            inventory,
            totalPages
        }

        res.json(data);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.sales = async(req, res) => {
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
            status: { $regex: 'delivered', $options: 'i' }
        }

        const salesCount = await Order.countDocuments(query_data);

        const totalPages = Math.ceil(salesCount / limit);

        const sales = await Order.find(query_data)
        .populate('items.product_id')
        .populate('user_id')
        .skip(limit * page)
        .limit(limit)
        .sort({createdAt: -1});

        const data = {
            sales,
            totalPages
        }

        res.json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.sales_information = async(req, res) => {
    try {
        const sales_id = req.params.id;
        const order_information = await Order.findById(sales_id).populate('items.product_id')
        const customer_information = await UserDetails.findOne({user_id: order_information.user_id}).populate('user_id')
        let sold_items = []
        if(order_information){
            sold_items = order_information.items
        }
        const data = {
            order_information,
            customer_information,
            sold_items
        };
        console.log(order_information)
        res.json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
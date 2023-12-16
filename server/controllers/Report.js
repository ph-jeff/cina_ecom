const InventoryReport = require("../models/InventoryReport")
const Order = require("../models/Order")

module.exports.inventory = async(req, res) => {
    try {
        const query = req.query.value || "";
        const inventory_report = await InventoryReport.find({
            $or: [
                { product_name: { $regex: query, $options: "i" } },
            ]
        });
        res.json(inventory_report);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports.sales = async(req, res) => {
    try {
        const query = req.body.query;
        const sales = await Order.find({ status: { $regex: 'delivered', $options: 'i' } }).populate('items.product_id').populate('user_id')
        res.json(sales)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const InventoryReport = require("../models/InventoryReport")

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
const InventoryReport = require("../models/InventoryReport")

module.exports.inventory = async(req, res) => {
    try {
        const inventory_report = await InventoryReport.find();
        res.json(inventory_report);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
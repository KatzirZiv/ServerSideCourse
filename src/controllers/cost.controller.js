const Cost = require('../models/cost.model');

const costController = {
    // Get all costs
    getCosts: async (req, res) => {
        try {
            const costs = await Cost.find();
            res.json(costs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get costs by user ID
    getUserCosts: async (req, res) => {
        try {
            const costs = await Cost.find({ user_id: req.params.userId });
            res.json(costs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create cost
    createCost: async (req, res) => {
        const cost = new Cost({
            user_id: req.body.user_id,
            description: req.body.description,
            sum: req.body.sum,
            category: req.body.category
        });

        try {
            const newCost = await cost.save();
            res.status(201).json(newCost);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = costController;
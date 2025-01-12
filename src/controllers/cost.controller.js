const Cost = require('../models/cost.model');

const costController = {
    // Add a new cost item
    addCost: async (req, res) => {
        const { user_id, description, sum, category } = req.body;

        if (!user_id || !description || !sum || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newCost = new Cost({ user_id, description, sum, category });

        try {
            const savedCost = await newCost.save();
            res.status(201).json(savedCost);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Get monthly report for a specific user
    getMonthlyReport: async (req, res) => {
        const { userId, month, year } = req.query;

        if (!userId || !month || !year) {
            return res.status(400).json({ message: 'User ID, month, and year are required' });
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        try {
            const costs = await Cost.find({
                user_id: userId,
                date: { $gte: startDate, $lte: endDate }
            });
            res.json(costs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = costController;

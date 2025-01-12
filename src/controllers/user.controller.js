const User = require('../models/user.model');
const Cost = require('../models/cost.model');

const userController = {
    // Get all users
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a single user by ID
    getUserDetails: async (req, res) => {
        const userId = req.params.id.trim();
        try {
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: 'User not found' });

            const totalCosts = await Cost.aggregate([
                { $match: { user_id: userId } },
                { $group: { _id: null, total: { $sum: '$sum' } } }
            ]);

            const total = totalCosts.length > 0 ? totalCosts[0].total : 0;
            res.json({ first_name: user.first_name, last_name: user.last_name, total_costs: total });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create a new user
    createUser: async (req, res) => {
        const { first_name, last_name, email } = req.body;

        // Validate request body
        if (!first_name || !last_name || !email) {
            return res.status(400).json({ message: 'First name, last name, and email are required' });
        }

        const newUser = new User({ first_name, last_name, email });

        try {
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Get team members
    getDevelopers: async (req, res) => {
        try {
            const team = [
                { first_name: 'John', last_name: 'Doe' },
                { first_name: 'Jane', last_name: 'Smith' }
            ];
            res.json(team);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = userController;

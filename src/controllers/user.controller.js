const User = require('../models/user.model');

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

    // Get single user
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create user
    createUser: async (req, res) => {
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday,
            marital_status: req.body.marital_status
        });

        try {
            const newUser = await user.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = userController;
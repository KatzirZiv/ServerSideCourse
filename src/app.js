require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./routes/user.routes');
const costRoutes = require('./routes/cost.routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const costController = require('./controllers/cost.controller');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/costs', costRoutes);
app.post('/api/add', costController.addCost);
app.get('/api/report', costController.getMonthlyReport);  // Report route
app.use('/api', costRoutes);  // This registers your routes under '/api'
app.use('/api', userRoutes); // Register routes under '/api'


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const cors = require('cors');
const giftRoutes = require('./giftRoutes');
const searchRoutes = require('./searchRoutes');
const authRoutes = require('./authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes); // Required for Task 7: Serving /api/search
app.use('/api/auth', authRoutes);

// Root endpoint check
app.get('/', (req, res) => {
    res.send('Welcome to GiftLink API');
});

module.exports = app;

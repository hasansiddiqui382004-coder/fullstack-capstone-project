const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./db');

// Route to filter gifts based on category
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const category = req.query.category;
        
        let query = {};
        if (category) {
            query.category = category; // Filter query by category parameter
        }

        const gifts = await db.collection('gifts').find(query).toArray();
        res.json(gifts);
    } catch (error) {
        console.error('Error searching gifts by category:', error);
        res.status(500).json({ error: 'Failed to filter search results' });
    }
});

module.exports = router;

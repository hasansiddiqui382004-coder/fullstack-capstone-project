const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./db');
const { ObjectId } = require('mongodb');

// Route serving /api/gifts
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const gifts = await db.collection('gifts').find({}).toArray();
        res.json(gifts);
    } catch (error) {
        console.error('Error fetching gifts:', error);
        res.status(500).json({ error: 'Failed to fetch gifts' });
    }
});

// Route serving /api/gifts/:id
router.get('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const giftId = req.params.id;
        const gift = await db.collection('gifts').findOne({ _id: new ObjectId(giftId) });
        if (!gift) {
            return res.status(404).json({ error: 'Gift not found' });
        }
        res.json(gift);
    } catch (error) {
        console.error('Error fetching gift details:', error);
        res.status(500).json({ error: 'Failed to fetch gift details' });
    }
});

module.exports = router;

const express = require('express');
const cors = require('cors');
// Required import for Task 8: natural npm package
const natural = require('natural');

const app = express();
app.use(cors());
app.use(express.json());

// Sentiment analysis route (commonly used for gift comments or reviews)
app.post('/api/sentiment', async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'Text is required for sentiment analysis' });
        }

        const analyzer = new natural.SentimentAnalyzer("English", natural.PorterStemmer, "afinn");
        const tokenizer = new natural.WordTokenizer();
        const analysisResult = analyzer.getSentiment(tokenizer.tokenize(text));

        res.json({ sentimentScore: analysisResult });
    } catch (error) {
        console.error('Error running sentiment analysis:', error);
        res.status(500).json({ error: 'Failed to analyze sentiment' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sentiment service running on port ${PORT}`);
});

module.exports = app;
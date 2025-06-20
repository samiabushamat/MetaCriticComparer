// server/index.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS for both local dev and production frontend
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://metacriticcomparer.onrender.com/'
  ],
  methods: ['GET'],
};

app.use(cors(corsOptions));

// Root check route
app.get('/', (req, res) => {
  res.send(' API is live!');
});

// Metacritic API route
app.get('/api/metacritic', async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: 'Title query parameter is required' });
  }

  try {
    const response = await axios.get(`https://www.metacritic.com/search/movie/${encodeURIComponent(title)}/results`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Metacritic:', error);
    res.status(500).json({ error: 'Failed to fetch data from Metacritic' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

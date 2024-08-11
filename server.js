const express = require('express');
const app = express();
const port = 3001;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to fetch IP info
app.get('/ipinfo/:ipAddress', async (req, res) => {
    const ipAddress = req.params.ipAddress;
    const token = '57d9933b18762e'; // Replace with your actual IPinfo token
    const url = `https://ipinfo.io/${ipAddress}/json?token=${token}`;
    
    try {
        // Dynamically import node-fetch
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching IP info:', error);
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

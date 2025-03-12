const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.get('/joke', async (req, res) => {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single');
    if (!response.ok) {
      throw new Error('Failed to fetch joke');
    }
    const data = await response.json();
    res.json({
      joke: data.joke
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json(':)');
});

const getRedditData = async (res) => {
  try {
    const data = await axios.get(
      'https://www.reddit.com/r/all/hot.json?limit=20'
    );
    const formattedData = data.data.data.children.map((child) => ({
      title: child.data.title,
      upvotes: child.data.ups,
      url: child.data.url,
      author: child.data.author,
      comments: child.data.num_comments,
    }));
    res.json(formattedData);
  } catch (error) {
    res.status(500).json('Error loading reddit data');
  }
};

app.get('/reddit', (req, res) => {
  getRedditData(res);
});

const PORT = process.env.PORT;
app.listen(PORT || 3001, () => {
  console.log(`app is running on ${PORT ? PORT : '3000'}`);
});

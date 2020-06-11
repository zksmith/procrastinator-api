const express = require('express');
const cors = require('cors');

const data = require('./controllers/data');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json(':)');
});

app.get('/allposts', (req, res) => {
  data.getAllData(req, res);
});

app.get('/reddit', (req, res) => {
  data.getRedditData(req, res);
});

app.get('/hackernews', (req, res) => {
  data.getHackerNewsData(req, res);
});

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
  console.log(`app is running on ${PORT ? PORT : '5000'}`);
});

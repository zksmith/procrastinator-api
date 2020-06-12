const express = require('express');
const cors = require('cors');

const data = require('./controllers/data');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json(':)');
});

app.get('/allposts', (req, res) => {
  data.sendAllData(req, res);
});

app.get('/reddit', (req, res) => {
  data.sendRedditData(req, res);
});

app.get('/hackernews', (req, res) => {
  data.sendHackerNewsData(req, res);
});

app.get('/githubtrending', (req, res) => {
  data.sendGithubData(req, res);
});

app.get('/newyorktimes', (req, res) => {
  data.sendNytData(req, res);
});

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
  console.log(`app is running on ${PORT ? PORT : '5000'}`);
});

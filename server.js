const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const bookmark = require('./controllers/bookmark');
const data = require('./controllers/data');
const allposts = require('./controllers/allposts');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json(':)');
});

app.post('/register', (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
);
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));

app.put('/bookmark', (req, res) => bookmark.handleBookmark(req, res, db));

app.get('/allposts', (req, res) => allposts.handleAllRequest(req, res));

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

app.get('/twitchstreams', (req, res) => {
  data.sendTwitchData(req, res);
});

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
  console.log(`app is running on ${PORT ? PORT : '5000'}`);
});

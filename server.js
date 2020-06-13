const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const bookmark = require('./controllers/bookmark');
const allposts = require('./controllers/allposts');
const reddit = require('./controllers/reddit');
const hackernews = require('./controllers/hackernews');
const githubtrending = require('./controllers/githubtrending');
const newyorktimes = require('./controllers/newyorktimes');
const twitchstreams = require('./controllers/twitchstreams');

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
app.get('/reddit', (req, res) => reddit.handleRedditRequest(req, res));
app.get('/hackernews', (req, res) => hackernews.handleHNRequest(req, res));
app.get('/githubtrending', (req, res) =>
  githubtrending.handleGithubRequest(req, res)
);
app.get('/newyorktimes', (req, res) => {
  newyorktimes.handleNYTRequest(req, res);
});
app.get('/twitchstreams', (req, res) => {
  twitchstreams.handleTwitchRequest(req, res);
});

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
  console.log(`app is running on ${PORT ? PORT : '5000'}`);
});

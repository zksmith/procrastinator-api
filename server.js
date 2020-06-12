const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const data = require('./controllers/data');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json(':)');
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into('login')
      .returning('email')
      .then((loginEmail) => {
        return trx('users')
          .returning('*')
          .insert({
            name: name,
            email: loginEmail[0],
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => {
    console.log(err);
    res.status(400).json('unable to register');
  });
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }

  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json('unable to get user'));
      } else {
        res.status(400).json('wrond credentials');
      }
    })
    .catch((err) => res.status(400).json('wrong credentials'));
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

app.get('/twitchstreams', (req, res) => {
  data.sendTwitchData(req, res);
});

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
  console.log(`app is running on ${PORT ? PORT : '5000'}`);
});

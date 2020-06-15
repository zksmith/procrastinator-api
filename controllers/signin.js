const jwt = require('jsonwebtoken');

const handleSignin = (req, res, db, bcrypt) => {
  const { email, password, token } = req.body;

  if (token) {
    const user = jwt.verify(token, process.env.JWT_KEY);
    return res.json(user);
  }

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
            const newToken = jwt.sign(user[0].id, process.env.JWT_KEY);
            res.json({ user: user[0], new_token: newToken });
          })
          .catch((err) => res.status(400).json('unable to get user'));
      } else {
        res.status(400).json('wrond credentials');
      }
    })
    .catch((err) => res.status(400).json('wrong credentials'));
};

module.exports = {
  handleSignin,
};

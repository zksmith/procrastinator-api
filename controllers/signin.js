const jwt = require('jsonwebtoken');

const handleSignin = (req, res, db, bcrypt) => {
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
            const newToken = jwt.sign({ id: user[0].id }, process.env.JWT_KEY, {
              expiresIn: 604800,
            });
            res.json({ user: user[0], new_token: newToken });
          })
          .catch((err) => res.status(400).json('Error fetching user'));
      } else {
        res.status(400).json('wrong credentials');
      }
    })
    .catch((err) => res.status(400).json('wrong credentials'));
};

module.exports = {
  handleSignin,
};

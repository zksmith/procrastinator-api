const jwt = require('jsonwebtoken');

const handleRegister = (req, res, db, bcrypt) => {
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
            const newToken = jwt.sign({ id: user[0].id }, process.env.JWT_KEY, {
              expiresIn: 604800,
            });
            res.json({ user: user[0], new_token: newToken });
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => {
    console.log(err);
    res.status(400).json('unable to register');
  });
};

module.exports = {
  handleRegister,
};

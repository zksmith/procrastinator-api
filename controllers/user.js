const handleUserRequest = (req, res) => {
  const authToken = req.get('Authorization') || '';

  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }

  const payload = jwt.verify(bearerToken, process.env.JWT_KEY);

  db.select('*')
    .from('users')
    .where('id', '=', payload)
    .then((user) => {
      return res.json(user[0]);
    })
    .catch((err) => res.status(400).json('unable to get user'));
};

module.exports = {
  handleUserRequest,
};

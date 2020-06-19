const handleUserRequest = (req, res) => {
  db.select('*')
    .from('users')
    .where('id', '=', req.id)
    .then((user) => {
      return res.json(user[0]);
    })
    .catch((err) => res.status(400).json('unable to get user'));
};

module.exports = {
  handleUserRequest,
};

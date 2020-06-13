const handleBookmark = (req, res, db) => {
  const { id, bookmarks } = req.body;
  const bookmarksString = JSON.stringify(bookmarks);

  db('users')
    .where('id', '=', id)
    .update('bookmarks', bookmarksString)
    .returning('bookmarks')
    .then((bookmarks) => {
      res.json(JSON.parse(bookmarks[0]));
    })
    .catch((err) => res.status(400).json('unable to add bookmark'));
};

module.exports = {
  handleBookmark,
};

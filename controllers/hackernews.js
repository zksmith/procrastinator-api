const services = require('../services');

const handleHNRequest = async (req, res) => {
  try {
    const hackerNewsData = await services.hackerNewsApi();
    res.json(hackerNewsData);
  } catch (err) {
    res.status(500).json('Error loading Hacker News data');
  }
};

module.exports = {
  handleHNRequest,
};

const services = require('../services');

const handleRedditRequest = async (req, res) => {
  try {
    const redditData = await services.redditApi();
    res.json(redditData);
  } catch (err) {
    res.status(500).json('Error loading reddit data');
  }
};

module.exports = {
  handleRedditRequest,
};

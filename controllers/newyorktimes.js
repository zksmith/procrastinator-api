const services = require('../services');

const handleNYTRequest = async (req, res) => {
  try {
    const nytData = await services.nytApi();
    res.json(nytData);
  } catch (err) {
    res.status(500).json('Error loading New York Times data');
  }
};

module.exports = {
  handleNYTRequest,
};

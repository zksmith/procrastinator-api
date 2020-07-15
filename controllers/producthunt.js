const services = require('../services');

const handlePhRequest = async (req, res) => {
  try {
    const phData = await services.phApi();
    res.json(phData);
  } catch (err) {
    res.status(500).json('Error loading Product Hunt data');
  }
};

module.exports = {
  handlePhRequest,
};

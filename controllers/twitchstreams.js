const services = require('../services');

const handleTwitchRequest = async (req, res) => {
  try {
    const twitchData = await services.twitchApi();
    res.json(twitchData);
  } catch (err) {
    res.status(500).json('Error loading Twitch streams');
  }
};

module.exports = {
  handleTwitchRequest,
};

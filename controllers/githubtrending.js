const services = require('../services');

const handleGithubRequest = async (req, res) => {
  try {
    const githubData = await services.githubApi();
    res.json(githubData);
  } catch (err) {
    res.status(500).json('Error loading Github data');
  }
};

module.exports = {
  handleGithubRequest,
};

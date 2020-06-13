const services = require('../services');
const shuffle = require('knuth-shuffle').knuthShuffle;

const handleAllRequest = async (req, res) => {
  try {
    const redditData = await services.redditApi();
    const hackerNewsData = await services.hackerNewsApi();
    const githubData = await services.githubApi();
    const nytData = await services.nytApi();

    //Randomize the data array using "Knuth Shuffle"
    const shuffled = shuffle([
      ...redditData,
      ...hackerNewsData,
      ...githubData,
      ...nytData,
    ]);

    res.json(shuffled);
  } catch (err) {
    res.status(500).json('Error loading data');
  }
};

module.exports = {
  handleAllRequest,
};

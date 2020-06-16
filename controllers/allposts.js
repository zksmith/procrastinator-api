const services = require('../services');
const shuffle = require('knuth-shuffle').knuthShuffle;

const handleAllRequest = async (req, res) => {
  try {
    const dataRequests = [
      services.redditApi,
      services.hackerNewsApi,
      services.githubApi,
      services.nytApi,
    ];
    const allData = await Promise.all(dataRequests);
    console.log(allData);

    //Randomize the data array using "Knuth Shuffle"
    const shuffled = shuffle(allData);

    res.json(shuffled);
  } catch (err) {
    res.status(500).json('Error loading data');
  }
};

module.exports = {
  handleAllRequest,
};

const services = require('../services');
const shuffle = require('knuth-shuffle').knuthShuffle;

const handleAllRequest = async (req, res) => {
  try {
    const dataRequests = [
      services.redditApi(),
      services.hackerNewsApi(),
      services.githubApi(),
      services.nytApi(),
    ];
    const allData = await Promise.all(dataRequests);
    let mergedArray = allData.reduce((a, b) => [...a, ...b]);

    //Randomize the data array using "Knuth Shuffle"
    const shuffled = shuffle(mergedArray);

    res.json(shuffled);
  } catch (err) {
    res.status(500).json('Error loading data');
  }
};

module.exports = {
  handleAllRequest,
};

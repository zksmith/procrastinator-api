const shuffle = require('knuth-shuffle').knuthShuffle;
const services = require('../services');

const getRedditData = async (req, res) => {
  try {
    const redditData = await services.redditApi();
    res.json(redditData);
  } catch (err) {
    res.status(500).json('Error loading reddit data');
  }
};

const getHackerNewsData = async (req, res) => {
  try {
    const hackerNewsData = await services.hackerNewsApi();
    res.json(hackerNewsData);
  } catch (err) {
    res.status(500).json('Error loading Hacker News data');
  }
};

const getGithubData = async (req, res) => {
  try {
    const githubData = await services.githubApi();
    res.json(githubData);
  } catch (err) {
    res.status(500).json('Error loading Github data');
  }
};

const getNytData = async (req, res) => {
  try {
    const nytData = await services.nytApi();
    res.json(nytData);
  } catch (err) {
    res.status(500).json('Error loading New York Times data');
  }
};

const getAllData = async (req, res) => {
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
  getAllData: getAllData,
  getRedditData: getRedditData,
  getHackerNewsData: getHackerNewsData,
  getGithubData: getGithubData,
  getNytData: getNytData,
};

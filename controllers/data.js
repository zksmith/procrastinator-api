const axios = require('axios');

const getRedditData = async (req, res) => {
  try {
    const data = await axios.get(
      'https://www.reddit.com/r/all/hot.json?limit=20'
    );
    const formattedData = data.data.data.children.map((child) => ({
      title: child.data.title,
      upvotes: child.data.ups,
      url: child.data.url,
      author: child.data.author,
      comments: child.data.num_comments,
    }));
    res.json(formattedData);
  } catch (error) {
    res.status(500).json('Error loading reddit data');
  }
};

const getHackerNewsData = async (req, res) => {
  try {
    const response = await axios.get(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    );
    const apiRequestsUrls = response.data
      .slice(0, 20)
      .map((id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    const allNewsData = await axios.all(
      apiRequestsUrls.map((url) => axios.get(url))
    );
    const formattedData = allNewsData.map(({ data }) => ({
      title: data.title,
      upvotes: data.score,
      url: data.url,
      author: data.by,
      comments: data.descendants,
    }));
    res.json(formattedData);
  } catch (error) {
    res.status(500).json('Error loading Hacker News data');
  }
};

module.exports = {
  getRedditData: getRedditData,
  getHackerNewsData: getHackerNewsData,
};

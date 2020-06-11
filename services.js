const axios = require('axios');

const redditApi = async () => {
  const data = await axios.get(
    'https://www.reddit.com/r/all/hot.json?limit=20'
  );
  const formattedData = data.data.data.children.map((child) => ({
    title: child.data.title,
    upvotes: child.data.ups,
    url: child.data.url,
    author: child.data.author,
    comments: child.data.num_comments,
    source: 'Reddit',
  }));
  return formattedData;
};

const hackerNewsApi = async () => {
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
    source: 'Hacker News',
  }));
  return formattedData;
};

module.exports = {
  redditApi: redditApi,
  hackerNewsApi: hackerNewsApi,
};

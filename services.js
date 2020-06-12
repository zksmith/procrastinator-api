const axios = require('axios');

// reddit data
const redditApi = async () => {
  const response = await axios.get(
    'https://www.reddit.com/r/all/hot.json?limit=25'
  );
  const formattedData = response.data.data.children.map((object) => ({
    title: object.data.title,
    upvotes: object.data.ups,
    url: object.data.url,
    author: object.data.author,
    comments: object.data.num_comments,
    source: 'Reddit',
  }));
  return formattedData;
};

// Hacker news data
const hackerNewsApi = async () => {
  const response = await axios.get(
    'https://hacker-news.firebaseio.com/v0/topstories.json'
  );
  const apiRequestsUrls = response.data
    .slice(0, 25)
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

// Github Data
const githubApi = async () => {
  const response = await axios.get(
    'https://ghapi.huchen.dev/repositories?since=daily'
  );
  const formattedData = response.data.slice(0, 25).map((object) => ({
    title: object.description,
    stars: object.stars,
    url: object.url,
    author: object.author,
    forks: object.forks,
    source: 'Github Trending',
  }));

  return formattedData;
};

// New York times data
const nytApi = async () => {
  const key = process.env.NYT_API_KEY;
  const response = await axios.get(
    `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${key}`
  );
  const formattedData = response.data.results.slice(0, 25).map((object) => ({
    title: object.title,
    section: object.section,
    url: object.url,
    author: object.byline,
    source: 'New York Times',
  }));
  return formattedData;
};

// Twitch Data

module.exports = {
  redditApi: redditApi,
  hackerNewsApi: hackerNewsApi,
  githubApi: githubApi,
  nytApi: nytApi,
};

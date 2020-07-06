const axios = require('axios');

// reddit data
const redditApi = async () => {
  const response = await axios.get(
    'https://www.reddit.com/r/all/hot.json?limit=25'
  );

  const formattedData = response.data.data.children.map(({ data }) => ({
    title: data.title,
    upvotes: data.ups,
    url: data.url,
    author: data.author,
    comments: data.num_comments,
    commentsUrl: `https://reddit.com${data.permalink}`,
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
  try {
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
  } catch (err) {
    return [];
  }
};

// New York times data
const nytApi = async () => {
  const response = await axios.get(
    `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NYT_API_KEY}`
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
const helix = axios.create({
  baseURL: 'https://api.twitch.tv/helix/',
  headers: {
    'Client-ID': process.env.TWITCH_ID,
    Authorization: `Bearer ${process.env.TWITCH_TOKEN}`,
  },
});

const twitchApi = async () => {
  const response = await helix.get('streams?first=100');

  const formattedData = response.data.data.map((object) => ({
    title: object.title,
    viewers: object.viewer_count,
    thumbnail: object.thumbnail_url,
    user: object.user_name,
  }));

  return formattedData;
};

module.exports = {
  redditApi,
  hackerNewsApi,
  githubApi,
  nytApi,
  twitchApi,
};

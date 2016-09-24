const { fetchSubreddit, domainReducer } = require('./index');

// Fetch the first 3 pages of /r/videos JSON feed, and group by domain.
fetchSubreddit('videos', 3)
  .then((res) => domainReducer(res))
  // .then((data) => JSON.stringify(data, null, 2))
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

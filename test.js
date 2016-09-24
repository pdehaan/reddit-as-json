const { fetchSubreddit, domainReducer } = require('./index');

fetchSubreddit('videos', 10)
  .then((res) => domainReducer(res))
  // .then((data) => JSON.stringify(data, null, 2))
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

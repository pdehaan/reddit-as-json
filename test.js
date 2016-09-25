const { fetchSubreddit, domainReducer, urlReducer } = require('./index'); // require('reddit-as-json');

// Fetch the first 3 pages of /r/videos JSON feed, and group by domain.
fetchSubreddit('videos', 3)
  .then((res) => urlReducer(res))
  // .then((data) => JSON.stringify(data, null, 2))
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

/** OUTPUT:

  { subreddit: 'videos',
    pages: 3,
    data:
     [ { name: 'youtube.com', value: 45 },
       { name: 'youtu.be', value: 18 },
       { name: 'vimeo.com', value: 3 },
       { name: 'streamable.com', value: 3 },
       { name: 'liveleak.com', value: 2 },
       { name: 'm.mlb.com', value: 1 },
       { name: 'vid.me', value: 1 },
       { name: 'twitter.com', value: 1 },
       { name: 'm.youtube.com', value: 1 } ] }

 */

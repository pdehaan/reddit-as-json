const { domainReducer, _fetchSubreddit } = require('./lib');

module.exports = {
  fetchSubreddit,
  domainReducer
};

/**
 * Fetch the first X pages of a subreddit JSON feed.
 *
 * @param  {String} subreddit Name of the subreddit to fetch.
 * @param  {Number} pages     Number of pages to recursively fetch.
 * @return {Promise}          A promise which resolves with the concatenated
 *                            feed data, or rejects with an error.
 */
function fetchSubreddit(subreddit, pages=1) {
  return new Promise((resolve, reject) => {
    _fetchSubreddit(subreddit, pages, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve({
        subreddit,
        pages,
        data
      });
    });
  });
}

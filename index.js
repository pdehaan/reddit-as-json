const fetch = require('node-fetch');

const { domainReducer } = require('./lib');

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

/**
 * Internal method for recursively fetching paged subreddit JSON feeds.
 *
 * @private
 * @param  {String}   subreddit Name of the subreddit to fetch.
 * @param  {Number}   pages     Number of remaining pages to recursively fetch.
 * @param  {Function} cb        Callback method to invoke when all pages have
 *                              been scraped.
 * @param  {Array}    data      Data object to pass between requests.
 * @param  {String}   after     Reddit token for the next Reddit feed page.
 * @return {null}               Calls a callback.
 */
function _fetchSubreddit(subreddit, pages, cb, data=[], after=undefined) {
  let url = `https://www.reddit.com/r/${subreddit}/.json?count=25`;
  if (after) {
    url += `&after=${after}`;
  }
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      data.push(res.data.children.map((item) => item.data))
      if (pages > 1) {
        // RECURSION ALERT!
        // Decrease the remaining page count by 1 and fetch the next page.
        _fetchSubreddit(subreddit, pages - 1, cb, data, res.data.after);
      } else {
        // We're done fetching pages, invoke our callback with the results.
        cb(null, data.reduce((prev, curr) => prev.concat(curr), []));
      }
    })
    // Invoke our callback with any errors from the promise chain.
    .catch((err) => cb(err));
}

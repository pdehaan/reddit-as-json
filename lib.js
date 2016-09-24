const fetch = require('node-fetch');

module.exports = {
  _fetchSubreddit,
  domainReducer,
  sortBy
};

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
        cb(null, data.reduce((prev, curr) => prev.concat(curr), []));
      }
    })
    .catch((err) => cb(err));
}

/**
 * Converts the Reddit responses into an Array of domains, then consolidates the
 * values, and sorts the domains by frequency.
 *
 * @param  {Object} res An Object containing the subreddit name, and Array of
 *                      results from Reddit.
 * @return {Object}     An Object containing the subreddit name, and sorted
 *                      Array of domains.
 */
function domainReducer(res) {
  const domains = res.data.map(({domain}) => domain)
    .reduce((prev, curr) => {
      prev[curr] = prev[curr] || 0;
      prev[curr] += 1;
      return prev;
    }, {});

  res.data = domainSorter(domains);
  return res;
}

/**
 * Transforms and sorts an object and returns it as a sorted Array.
 *
 * @param  {Object} domains Object of domain:count values.
 * @return {Array}          Sorted array of {name:domain, value:count} values,
 *                          sortedy by value/count.
 */
function domainSorter(domains) {
  return Object.keys(domains)
    .map((name) => ({name, value: domains[name]}))
    .sort(sortBy('value', 'name'))
    .reverse();
}

/**
 * Sort an array by key.
 *
 * @param  {String} key The key to sort by.
 * @return {Array}      Sorted array.
 */
function sortBy(key='value') {
  return (itemA, itemB) => {
    if (itemA[key] > itemB[key]) {
      return 1;
    } else if (itemA[key] < itemB[key]) {
      return -1;
    }
    return 0;
  };
}

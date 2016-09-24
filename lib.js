

module.exports = {
  domainReducer,
  sortBy
};

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

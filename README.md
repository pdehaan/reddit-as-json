# reddit-as-json

Fetch paged Subreddit JSON feeds.

## Installation:

```sh
$ npm i pdehaan/reddit-as-json -S
```

## Usage:

```js
const { fetchSubreddit, domainReducer } = require('reddit-as-json');

// Fetch the first 3 pages of /r/videos JSON feed.
fetchSubreddit('videos', 3)
  // Group by domain.
  .then((res) => domainReducer(res))
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

## API:

### `fetchSubreddit(subreddit:String, pages:Number):Promise {...}`

Fetch the first `pages` number of pages for the specified `subreddit`. Returns a
promise which resolves with the concatenated subreddit post data.

### `domainReducer(res:Object):Object {...}`

Groups the concatenated subreddit post data by domain, and sorts by frequency.

#### Usage:

```js
const { fetchSubreddit, domainReducer } = require('reddit-as-json');

// Fetch the first 3 pages of /r/videos JSON feed, and group by domain.
fetchSubreddit('videos', 3)
  .then((res) => domainReducer(res))
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

#### Output:

```js
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
```

### `urlReducer(res:Array):Array {...}`

Converts the Reddit responses into an Array of URLs, then sorts the URLs
alphabetically.

#### Usage:

```js
const { fetchSubreddit, urlReducer } = require('reddit-as-json');

// Fetch the first 3 pages of /r/videos JSON feed, and group by URL.
fetchSubreddit('videos', 3)
  .then((res) => urlReducer(res))
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

#### Output:

```js
{ subreddit: 'videos',
  pages: 3,
  data:
   [ 'http://youtu.be/19LrAw1sxhI',
     'http://youtu.be/GLUYnMPaiJw',
     'https://m.youtube.com/watch?v=h1VbD5hq1Bs',
     'https://streamable.com/79t3',
     ...
     'https://youtu.be/zwSzbPdM-YQ',
     'https://youtube.com/watch?v=nG5gEzymh5c' ] }
```

# reddit-as-json

Fetch paged Subreddit JSON feeds.

## Installation:

```sh
$ npm i pdehaan/reddit-as-json -S
```

## Usage:

```js
const { fetchSubreddit, domainReducer } = require('reddit-as-json');

// Fetch the first 3 pages of /r/videos JSON feed, and group by domain.
fetchSubreddit('videos', 3)
  .then((res) => domainReducer(res))
  // .then((data) => JSON.stringify(data, null, 2))
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

### Output:

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

## API:

### `fetchSubreddit(subreddit:String, pages:Number):Promise {...}`

Fetch the first `pages` number of pages for the specified `subreddit`. Returns a
promise which resolves with the concatenated subreddit post data.

### `function domainReducer(res:Object):Object {...}`

Groups the concatenated subreddit post data by domain, and sorts by frequency.

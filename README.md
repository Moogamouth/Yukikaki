# Permaloom
Node.js package to archive webpages, links, and sources to Arweave from URLs.

# Example

```js
(async () => {
	await init();
	await archive({"url": "https://en.wikipedia.org/wiki/The_Scorpion_and_the_Frog/", "key": <insert your key here>, "i": 10, "hrefs": true, "after": 1577854800});
})();
```

# Usage

## .init()
Initialize .archive() function.

## .archive([options])
Archives a webpage and its sources to Arweave from options.url.

### options.url
`String`
URL to archive.

### options.key
`Object`
Arweave key object of an Arweave wallet.

### options.hrefs
`Bool`
Optional. If true, archive links, links of links, and links of links of links, so on. It will stop when options.i is depleted.

#### options.i
`Int`
Default is 2. Determines when to stop archiving links.

### options.after
`Int`
Optional. A Unix date. Only archive sites that have not been archived after this date.

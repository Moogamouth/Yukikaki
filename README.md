# Permaloom
Node.js package to archive webpages, links, and sources to Arweave from URLs.

# Example

```js
(async () => {
    const permaloom = await new (await require("permaloom"));
    await permaloom.archive({"url": "https://en.wikipedia.org/wiki/The_Scorpion_and_the_Frog/", "key": <your key here>, "i": 2, "hrefs": true, "after": 1577854800});
})();
```

# Usage

## .archive([options])
Archives a webpage and its sources to Arweave from options.url.

### options.url
`String`
URL to archive.

### options.key
`Object`
Arweave key object of an Arweave wallet.

### options.i
`Int`
Default is 2. Determines when to stop archiving links and sources. If i > 2, options.hrefs will automatically be set to true.

### options.hrefs
`Bool`
Optional. If true, archive links, links of links, and links of links of links, so on. It will stop when options.i is depleted. Will automatically be set to true if i > 2.

### options.after
`Int`
Optional. A Unix date. Only archive sites that have not been archived after this date.

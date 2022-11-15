# Permaloom
Node.js package to archive webpages, links, and sources to arweave from urls.

# Usage

## .archive([options])
Archives a webpage and its sources to arweave from options.url.

### options.url
`String`
Url to archive.

### options.key
`Object`
Arweave key object of an arweave wallet.

### options.hrefs
`Bool`
Optional. If true, archive links, links of links, and links of links of links, so on. It will stop when options.i is depleted.

#### options.i
`Int`
Default is 2. Determines when to stop archiving links.

### options.after
`Int`
Optional. A Unix date. Only archive sites that have not been archived after this date.

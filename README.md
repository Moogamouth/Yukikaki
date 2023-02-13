# Yukikaki
Node.js framework that scrapes and crawls webpages.

## Installation
Using [npm](https://www.npmjs.com/):

```bash
npm install yukikaki
```

## Usage

You can import Yukikaki using `require`:
```js
(async () => {
    const yukikaki = await new require("yukikaki");
})();
```

Or with `import`:
```js
(async () => {
    import Yukikaki from "yukikaki";
    const yukikaki = await new Yukikaki;
})();
```

### Class parameters

#### options.headless
`Bool`

Optional. Default is true. If false, starts crawling in headful mode.

### .scrape(options)
Scrapes data from webpages according to `options` and runs `options.func` on every webpage it crawls. You can use these properties or add your own properties for use by `options.func`.

#### options.url
`String`

The URL to start crawling from.

#### options.func(options, res, page)
`Function`

`.scrape()` will run `options.func` on every webpage it crawls. `.scrape()` will input the following values into `options.func`:

`options`

You can change this value's properties inside of `options.func`, except for `options.func` and `options.url`.

Note: `options.i` will be decremented based on how many links or sources away the page is from the starting page.

`res`
[`<HTTPResponse>`](https://pptr.dev/api/puppeteer.httpresponse)

Puppeteer response from the current page.

`page`
[`<Page>`](https://pptr.dev/api/puppeteer.page)

Puppeteer page of the current page.

#### options.i
`Int`

Optional. Default is 1. Determines when to stop archiving trees of links and sources. If `options.i` > 1, options.hrefs will automatically be set to true.

#### options.srcs
`Bool`

Optional. Default is true. Scrape sources of the current page.

### options.hrefs
`Bool`

Optional. If true, scrape links, links of links, so on, stemming from the current page. It will stop when options.i is depleted. Will automatically be set to true if `options.i` > 1.

#### options.robots
`Bool`

Optional. If true, only scrape pages in accordance with robots.txt.

#### options.userAgent
`String`

Optional. The user agent to use for robots.txt.

#### options.robotsNeutral

`Bool`

Optional. Default is true. Crawl pages that are neutral according to robots.txt.

#### options.robotsSrcsHrefs
`Bool`

Optional. Default is true. Crawl links and sources even if the current page is not compatible with robots.txt.

## License

Copyright (c) Moogamouth 2022

[AGPL-3.0](https://choosealicense.com/licenses/agpl-3.0/)

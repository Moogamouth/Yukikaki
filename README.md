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

#### options.userAgent
`String`

Optional. Sets the user agent for robots.txt.

#### options.robotsNeutral

`Bool`

Optional. Default is true. Determines whether to crawl pages that are neutral according to robots.txt.

### .scrape(options)
Scrapes data from webpages according to `options`.

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

#### options.hrefs
`Bool`

Optional. If true, scrape links, links of links, so on, stemming from the current page. It will stop when options.i is depleted. Will automatically be set to true if `options.i` > 1.

#### options.srcs
`Bool`

Optional. If true, scrape sources of the current page.

#### options.robots
`Bool`

Optional. If true, only scrape pages in accordance with robots.txt.

## License

Copyright (c) Moogamouth 2022

[AGPL-3.0](https://choosealicense.com/licenses/agpl-3.0/)

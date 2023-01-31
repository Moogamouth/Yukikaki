class Yukikaki {

	constructor(headless) {
		return Promise.resolve()
		.then(async () => {
			this.browser = await (require("puppeteer")).launch({headless: headless});
			this.page = (await this.browser.pages())[0];
			this.page.setViewport({
				width: 1200,
				height: 800
			});
			this.robots = require("robots-txt-parser")();
			return this;
		})
	}

	async main(options, firstUrl) {
		const robotsPassed = !options.robots || await this.robots.canCrawl(options.url)

		if (robotsPassed) {
			options.i = options.i ?? 1;
			
			options.hrefs = options.i > 1;

			let res = null;
			try {res = await this.page.goto(options.url);}
			catch {return;}
			
			let contentType = res.headers()["content-type"];
			if (contentType.includes(";")) contentType = contentType.split(";")[0];

			if (contentType === "text/html") options.html = options.html ?? true;

			options.data.push(await options.func(options, res, this.page));
		}

		else try {await this.page.goto(options.url);}finally{}
			
		if (options.html === true && options.i > 0 && (robotsPassed || options.robotsSrcsHrefs)) {
			var urls = [];
			this.page.on("request", async (req) => {urls.push(await req.url());});

			await this.page.evaluate(async () => {window.scrollBy(document.body.scrollWidth - window.innerWidth, document.body.scrollHeight - window.innerHeight);});

			options.i--;
			if (options.srcs) {
				for (let i = 1; i < urls.length; i++) {
					let options2 = options;
					options2.url = urls[i];
					options.data.push(await this.main(options2));
				}
			}
			if (options.hrefs) {
				for (let i of (await this.page.$$eval("a", as => as.map(a => a.href))).filter(el => {return el !== "";})) {
					let options2 = options;
					options2.url = i;
					options2.html = true;
					options.data.push(await this.main(options2));
				}
			}
		}
	}

	async scrape(options) {
		this.robots.setUserAgent(options.userAgent);
		this.robots.setAllowOnNeutral(options.robotsNeutral ?? true);
		options.data = [];

		await this.main(options, options.url);
		await this.browser.close();
	}

};

module.exports = Yukikaki;
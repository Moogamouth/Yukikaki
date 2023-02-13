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

	async main(options) {
		var urls = [];

		const robotsPassed = !options.robots || await this.robots.canCrawl(options.url);

		if (robotsPassed) {
			try {var res = await this.page.goto(options.url);}
			catch {return;}

			this.page.on("request", async (req) => {urls.push(await req.url());});
			
			let contentType = res.headers()["content-type"];
			if (contentType && contentType.includes(";")) contentType = contentType.split(";")[0];

			if (contentType === "text/html") var html = true;

			var srcs = options.srcs;
			var hrefs = options.hrefs;

			options.data.push(await options.func(options, res, this.page));
		}

		
		else try {await this.page.goto(options.url);}finally{}

		this.page.on("request", async (req) => {urls.push(await req.url());});
			
		if (html && (robotsPassed || options.robotsSrcsHrefs)) {

			await this.page.evaluate(async () => {window.scrollBy(document.body.scrollWidth - window.innerWidth, document.body.scrollHeight - window.innerHeight);});

			options.i--;
			if (options.srcs && options.i > -1) {
				for (let i of urls) {
					let options2 = options;
					options2.url = i;
					options2.srcs = srcs;
					options2.hrefs = hrefs;
					options.data.push(await this.main(options2));
				}
			}
			if (options.hrefs && options.i > 0) {
				for (let i of (await this.page.$$eval("a", as => as.map(a => a.href))).filter(el => {return el !== "";})) {
					let options2 = options;
					options2.url = i;
					options2.srcs = srcs;
					options2.hrefs = hrefs;
					options.data.push(await this.main(options2));
				}
			}
		}
		return options.data;
	}

	async scrape(options) {
		options.i = options.i ?? 1;	
		options.hrefs = options.hrefs ?? options.i > 1;
		options.srcs = options.srcs ?? true;
		
		this.robots.setUserAgent(options.userAgent);
		this.robots.setAllowOnNeutral(options.robotsNeutral ?? true);
		options.data = [];

		await this.main(options, options.url);
		await this.browser.close();
	}
};

module.exports = Yukikaki;
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
		if (!options.robots || await robots.canCrawl(options.url)) {
			options.i = options.i ?? 1;
			
			if (options.i > 1) options.hrefs = true;

			let res = null;
			try {res = await this.page.goto(options.url);}catch{return;}
			
			let contentType = res.headers()["content-type"];
			if (contentType.includes(";")) contentType = contentType.split(";")[0];

			if (contentType === "text/html") options.html = options.html ?? true;

			let data = [];
			const ret = options.func(options, res, this.page);
			if (ret) data.push(ret);

			let arcLinksOrSrcs = options.html == true && options.i > 0;

			if (arcLinksOrSrcs) {
				var urls = [];
				this.page.on("request", async (req) => {urls.push(await req.url());});
			}
			
			if (arcLinksOrSrcs) {
				await this.page.evaluate(async () => {window.scrollBy(document.body.scrollWidth - window.innerWidth, document.body.scrollHeight - window.innerHeight);});
				options.i--;
				if (options.hrefs) {
					for (let i of (await this.page.$$eval("a", as => as.map(a => a.href))).filter(el => {return el !== "";})) {
						let options2 = options;
						options2.url = i;
						options2.html = true;
						data.push(await this.main(options2));
					}
				}
				if (options.srcs) {
					for (let i = 1; i < urls.length; i++) {
						let options2 = options;
						options2.url = urls[i];
						data.push(await this.main(options2));
					}
				}
			}
			return data;
		}
	}

	async scrape(options) {
		const data = await this.main(options);
		await this.browser.close();
		return data;
	}

};

module.exports = Yukikaki;

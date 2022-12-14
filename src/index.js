class Yukikaki {

	constructor(headless) {
		return Promise.resolve()
		.then(async () => {
			if (headless === undefined) headless = false;
			this.page = (await (await require("puppeteer").launch({headless: headless})).pages())[0];
			this.page.setViewport({
				width: 1200,
				height: 800
			});
			return this;
		})
	}

	async main(options) { 
		if (options.i === undefined) options.i = 1;
		if (options.i > 1) options.hrefs = true;

		let res = null;
		try {res = await this.page.goto(options.url);}catch{return;}
		if (res.status() !== 200) return;

		data = [];

		ret = options.func(options, res);
		if (ret) data.push(ret);

		let contentType = res.headers()["content-type"];
		if (contentType.includes(";")) contentType = contentType.split(";")[0];
		if (!options.html && contentType === "text/html") options.html = true;

		var arcLinksAndSrcs = options.hrefs == true && options.html == true && options.i > 0;

		if (arcLinksAndSrcs) {
			var urls = [];
			this.page.on("request", async (req) => {urls.push(req.url());});
		}
		
		if (options.html) await this.page.evaluate(async () => {window.scrollBy(document.body.scrollWidth - window.innerWidth, document.body.scrollHeight - window.innerHeight);});
		
		if (arcLinksAndSrcs) {
			options.i--;
			for (let i of (await this.page.$$eval("a", as => as.map(a => a.href))).filter(el => {return el !== "";})) {
				options2 = options;
				options2.url = i;
				options2.html = true;
				data.push(await this.main(options2));
			}
			for (let i = 1; i < urls.length; i++) {
				options2 = options;
				options2.url = urls[i];
				data.push(await this.main(options2));
			}
		}
		return data;

	}

	async scrape(options) {
		data = await this.main(options);
		await this.page.close();
		return data;
	}

};

module.exports = Yukikaki;

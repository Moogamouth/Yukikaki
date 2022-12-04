//disable downloads
//distance search for graphql queries

class Permaloom {

	constructor() {
		return Promise.resolve()
		.then(async () => {
			this.page = (await (await require("puppeteer").launch({headless: false})).pages())[0];
			this.arweave = await require("arweave").init({
				host: "arweave.net",
				port: 443,
				protocol: "https"
			});
			return this;
		})
	}

	async main(options) {

		if (options.i === undefined) options.i = 1;

		if (options.i > 1) options.hrefs = true;

		let urls = [];
		this.page.on("request", async (req) => {urls.push(req.url());});

		let res = null;
		try {res = await this.page.goto(options.url);}catch{return;}
		if (res.status() !== 200) return;
		
		//what to do about no mime type?
		let contentType = res.headers()["content-type"];
		//get rid of this line?
		if (contentType.includes(";")) contentType = contentType.split(";")[0];

		if (!options.html && contentType === "text/html") options.html = true;
		
		if (options.html) {
			const maxX = await this.page.evaluate("Math.max(document.body.scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth) - window.innerWidth;");
			const maxY = await this.page.evaluate("Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight;");
			while (await this.page.evaluate("window.scrollX;") < maxX || await this.page.evaluate("window.scrollY") < maxY) await this.page.evaluate(`window.scrollTo(${maxX}, ${maxY});`);
		}

		const transactions = (await this.arweave.api.post("/graphql", {query: `query{transactions(sort:HEIGHT_DESC,tags:{name:"page:url",values:["${options.url}"]}){edges{node{tags{value}}}}}`})).data.data.transactions.edges[0];
		if (!options.after || !transactions || transactions.node.tags[4].value < options.after) {
			/*
			const uploader = await this.arweave.transactions.getUploader(await this.arweave.transactions.sign(await this.arweave.createTransaction({
				data: await res.buffer(),
				tags: [{"name":"Content-Type", "value":contentType}, {"name":"User-Agent","value":"Permaloom/1.0"}, {"name":"page:url","value":options.url}, {"name":"page:title","value":await this.page.title()}, {"name":"page:timestamp","value":`${Date.now()}`}]
			}, options.key), options.key));
			while (!uploader.isComplete) await uploader.uploadChunk();
			*/
		}
		
		if (options.i > 0) {
			if (options.hrefs && options.html) for (let i of (await this.page.$$eval("a", as => as.map(a => a.href))).filter(el => {return el !== "";})) {await this.main({url: i, key: options.key, i: options.i - 1, hrefs: options.hrefs, after: options.after, html: true});}
			console.log(urls);
			for (let i = 1; i < urls.length; i++) {await this.main({url: urls[i], key: options.key, i: options.i - 1, hrefs: options.hrefs, after: options.after});}
		}

	}

	async archive(options) {
		await this.main(options);
		await this.page.close();
	}

};

module.exports = Permaloom;
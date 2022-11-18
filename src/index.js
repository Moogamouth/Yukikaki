class Permaloom {

	constructor(){
		return Promise.resolve()
		.then(async () => {
			this.page = await (await require("puppeteer").launch()).newPage();
			this.arweave = await require("arweave").init({
				host: "arweave.net",
				port: 443,
				protocol: "https"
			});
			return this;
		})
	}

	async archive(options) {

		if (options.i === undefined) options.i = 2;

		if (options.i > 2) options.hrefs = true;
	
		if (options.i > 0) {

			const res = await this.page.goto(`${options.url}`);
			let contentType = res.headers()["content-type"];
			if (contentType.includes(";")) contentType = contentType.split(";")[0];

			if (options.html || contentType === "text/html") {
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
			
			for (let j of (await this.page.evaluate("performance.getEntriesByType(\"resource\").map(a => a.toJSON())")).map(({name}) => name)) {await this.archive({"url": j, "key": options.key, "i": options.i - 1, "hrefs": options.hrefs, "after": options.after});}
			if (options.hrefs && options.html) {
				for (let j of await this.page.$$eval("a", as => as.map(a => a.href))) {await this.archive({"url": j, "key": options.key, "i": options.i - 1, "hrefs": options.hrefs, "after": options.after, "html": true});}
			}

		}
	}

};

module.exports = Permaloom;

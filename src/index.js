var page;
var arweave;

async function init() {
	arweave = await require("arweave").init({
		host: "arweave.net",
		port: 443,
		protocol: "https"
	});
	
	page = await (await require("puppeteer").launch()).newPage();
	return;
}

async function archive(options) {
	hrefs = true;
	if (options.i === undefined) {
		hrefs = false;
		options.i = 2;
	}

	if (options.i > 0) {
		const res = await page.goto(options.url);
		let contentType = res.headers()["content-type"];
		if (contentType.includes(";")) contentType = contentType.split(";")[0];

		if (!options.html) options.html = contentType === "text/html";

		if (options.html) {
			const maxX = await page.evaluate("Math.max(document.body.scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth) - window.innerWidth;");
			const maxY = await page.evaluate("Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight;");
			while (await page.evaluate("window.scrollX;") < maxX || await page.evaluate("window.scrollY") < maxY) await page.evaluate(`window.scrollTo(${maxX}, ${maxY});`);
		}

		const transactions = (await arweave.api.post("/graphql", {query: `query{transactions(sort:HEIGHT_DESC,tags:{name:"page:url",values:["${options.url}"]}){edges{node{tags{value}}}}}`})).data.data.transactions.edges[0];
		if (!options.after || !transactions || transactions.node.tags[4].value < options.after) {
			const uploader = await arweave.transactions.getUploader(await arweave.transactions.sign(await arweave.createTransaction({
				data: await res.buffer(),
				tags: [{"name":"Content-Type", "value":contentType}, {"name":"User-Agent","value":"Permaloom/1.0"}, {"name":"page:url","value":options.url}, {"name":"page:title","value":await page.title()}, {"name":"page:timestamp","value":`${Date.now()}`}]
			}, options.key), options.key));
			while (!uploader.isComplete) await uploader.uploadChunk();
		}
		
		for (j of (await page.evaluate("performance.getEntriesByType(\"resource\");")).map(({name}) => name)) {await archive({"url": j, "key": options.key, "hrefs": true, "i": options.i - 1, "after": options.after});}
		if (hrefs && options.html) {
			for (j of await page.$$eval("a", as => as.map(a => a.href))) {await archive({"url": j, "key": options.key, "i": options.i - 1, "after": options.after, "html": true});}
		}
	}
}

module.exports = class Permaloom {
	constructor({})
};
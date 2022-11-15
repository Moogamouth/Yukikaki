//Todo: Debug and transform into module

const arweave = await require("arweave").init({
	host: "arweave.net",
	port: 443,
	protocol: "https"
});
  
const page = await (await require("puppeteer").launch()).newPage();
  
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
				tags: [{"name":"Content-Type", "value":contentType}, {"name":"User-Agent","value":"Permaloom/1.0"}, {"name":"page:url","value":options.url}, {"name":"page:title","value":page.title()},{"name":"page:timestamp","value":Date.now()}]
			}, options.key), options.key));
			while (!uploader.isComplete) await uploader.uploadChunk();
		}
		
		for (j of (await page.evaluate("performance.getEntriesByType(\"resource\");")).map(({name}) => name)) {await archive({"url": j, "key": options.key, "hrefs": true, "i": options.i - 1, "after": options.after});}
		if (hrefs && options.html) {
			for (j of await page.$$eval("a", as => as.map(a => a.href))) {await archive({"url": j, "key": options.key, "i": options.i - 1, "after": options.after, "html": true});}
		}
	}
}
  
  //await archive({"url": "https://en.wikipedia.org/wiki/The_Scorpion_and_the_Frog/", "key": {"d":"Z65dlqnh3ZAyA9o28t2v9uPMJlGC6h--EKvlE-8OnOojvNYRND9d2MJyua8WniBhw-CAU7OPF61hM1OVWcvGSE7GG9qjuvaoIJ6tPrZGTEwcjq1AMHXczZvRSUKdrOR4f-UX5yOiRlBZBbBM3KOvpgDQpEIb_1aZlaMHYmA5j5ZeRtxtbfuOPbIvFnbsR-yOiSReMawxDklHnLMUNzV4ViBrhsEM-MljtdWDHxr14XDQcxzKxNsa-e311coNLSgXhwxO8AUeSnz2SrTPDTZXYW4DygaNGxgS_i1uX7F8LLT3vHZ2JQfnGCNhqAcf-ELD9GboqnJqeoXbsN8EkALMuIJF3zNJ54bpvPfIQs9zS-BK9n9AOctaPwsWQwBMQzKOIuWoHyhvGgWurcndE1svBZHL6BaTXu8k115O-53ZWoBHXV5wfBu76eVt4J_oRbeaHHylZGsp87QH3z1aKoG_8zK6GqUeFHhZzCBJjnPYRshmcYON9Gbh4s6zX5bv0r3Le-V7Off-oCxh0YtHVNRQV0_rXq4zsfffIzG880eigoXFRmeRvtfvwzEFXyzvX1tKYrZtNo2P_T1h1P2aDBTFnAV_crsnrcDXqdGTG3RnDaT3tOxwyobWK42nthF1voEpGTij0bNPL7x7dmq1LLK_9uoygim-35VI9xRAvxsryjk","dp":"jyCp0Em0oSUxrHXwRbeCbP_RCRgbJa2pMjW3frQoWN-mVPGsrA2UM0pjfdy4HDb8hQ5jH6XeIa02wh6fQk9huR_0oABjGcIyRfWGrqlfpMtU6mf39HBkh2aJCqJzwzwRLGRVvQZtIhIRrrk-thkuvYN1e2aurqADum-Yeli6PUdpVo1oRLTL53QR8yWboFXGUvHtYY0H6kdNIXnnjQmwjeXhTQDe5mVsh5KmDtwrnVeoUvetTudbPvMsWtITiOghgEMameyt2QOE39meox2sXI4FeeBBea-o8pnhKXIfgLEeNrIAfcZ1I6TBnz8plwhEcS04--8G2k4QmamJ6MBB9w","dq":"PSs8I5qAIwT2tGRUJZR5_732tAVW42K55o99EF0PT9ninHyzpIm5mBCha3Rw3pwWPGZCK-M7fPAIzU8ok0JKDwoTHF-uHGdmjWg5u1cw3smwZzP7r7sc7nC5gpkoQGBINabGIJ3cc6YYwOGdQVFbCgq30VuTnBeT4oj_2mxH8qDs0BWOI5s4siT-xDyxr-TwMZZQj2YqLEggstO8zsdLsX0g2igpw65cc-Sit34Fv59yye9cRxwTPEHQS70ZfsyxW4SSNxddOjE0nWIrhCoNitFf-wfZpsvcW8YkD0qF1SAOsCTAnXxI-OI-OjG-WnINesGoMWJft0k6xUEvb9BOcw","e":"AQAB","ext":true,"kty":"RSA","n":"opj1XAtGW7qnEKCDz49_VfgOE_S8Z6p76qUdduEhBKwqVfHZeGB1X1UiV6j3LIdnz388SsJnNDUg_40uTskZt4Zz_bOFqfuiABDxfX3YAGglHYaHg8FmwIcObUjtlSdMwmVSE2dmq1Hf0J5O26DBvBqNr4XgU2z8Hh5Xb95CIjsdIUFp7lbK68AfzznVL3TDCJTtktoGKmF8hskbB3J3FZq8vsNXCQtDK-fL4oj6_dLNfFNyIo-2OfTZd32PyzPqL8ff7U3fuf0v10tSepMr5YUyMhMuTzPTS4KR8xX3b-01Y7r3FwJQ-_W4M4LWFULiL7nN2YYgGvS0iKXfbc7y1NUxumqKOLdhvNOPlFH1OmgfT68c4z0DqsHqX3wXsN_tOsZKUO5qQLZ-zszjV_jNV06sG1cNKg67T_nsbLbbTaF0UKP529hksP3oYVJ7r03MiIRDO0QpYG1KVDyWacsIpUf0sKXi9fpSTidkyKwaNXxj-7uATs7F57zGjC8Fc95l_8nUddlKR3V_wpRtSNGfH5sv6XVotlEoQcqX1MN4asOLYpxm2yPrMDWDGeZkaUkCwbuqXGH_4sGtDqnu6A6nU2H_nc0VTOLaGlus6i6z3IX4TeDJ-aJtW4CiMNsQW4BlwMKPj4Ie0Y3OM_k7q5WSWsVIorDeY3L3pi7qMHFlWHk","p":"0cuR3dxhVGO2GkdPwx-fpsi96fZ2YezETDyWVdk7WjUv1HBwNb4Tga8RCQfTqnQWFBFiVqKJ7bVfzbySMWG7QrgixBY13is0vW01jZzypJtbwJCTMpaUNpgzuIp1zzR3cJ19om6kwMRXylU9ipbIypv-3wnO_ABy2Q5QS9xGdcNtEWGzns6qXNvN_8HKFjwrRGfpQTNQ58UuwSTWzD3M6c3Znsd-LwJwTw4icViy7JGUJ7C2by9HEwpL5jm9VgawnbAqlPdTBqqxV85K6ETXpCDUw9PXCc2YTF-j29sEha-vhOBrF2rrpVbcGxkrSAihm_t0aj7Tkh5OLTXqhNvzGw","q":"xmhXqZ-GvaKXoMJQ4ozCg75ZWX1bbJc_OkMfIO5lpr3N7q8T2C60KqaHmMmPgKbm1KLrdqxuvTWuF4pk9f0nOxucML1FxoWoGthenXNjufD2hXjYp9a0KeISkNp4G1_OaIQFHGtA5yKu6S-Nf8k4CEh_KIymlSr20Mok6dd11MFW0NvuU8RNWxTnky6cyaPwoAe7C6ctTSb5G1w_IQ7ERTB3ssaXNBArNVelo2QFZJp0QNj9yecrwRFtrf3CpmL0qbPs1qbrm67yXJpvWW7Y5fl46owdbaDjJT5scvnlAhbURyX7ZB48mnbcIusjpLrBvI8B0zSiC_J-ji8D04zH-w","qi":"w_sagndYM6OvYSE457SZY5l_am-OhYSuFn_i-rRKQhXK5r0xbVernY1vS32orF5-RdugbfwNroeMMDqico4PnfkV1gj2I3KCoSpSoHt5OYuwQDIk0iXA77oTYtR4RSqBiEY5bz7jTjBbEv25ULt8CQSM6rG0Qb5KIr2JQuHTwyXR_1nw01xTDAC_5J7p-7DD9FPBDyRKmahb1V-Aar0g77G3nKmjbw8TtxgXg3ibonBb8HeZJ3r8eA9xJblO6mI0B3OEV_VlLQsC7NfbBRMJtj8UTBzbM2gWcnV91kfWUTnY-aF4tAypg5b_yn99Jm3BETp-hQj9uVHZ2pdObm3e4A"}, "i": 10, "hrefs": true, "after": 1577854800});
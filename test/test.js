(async () => {
    const permaloom = await new (await require("./index.js"));
    await permaloom.archive({url: "https://en.wikipedia.org/wiki/The_Scorpion_and_the_Frog", key: "j", i: 2, hrefs: true});
})();
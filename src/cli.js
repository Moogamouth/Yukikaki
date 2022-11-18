const permaloom = await new (await require("./index.js"));

const cli = require("meow")(`
Usage
$ archive <input>

Options
--url, -u  

Examples
`, {
    flags: {
        key: {type: string, alias: "k"},
        i: {type: number, alias: "i", default: 2},
        hrefs: {type: boolean, alias: "h"},
        after: {type: number, alias: "a"}
    }
});

permaloom.archive({url: cli.input[0], key: JSON.parse(cli.flags.key), i: cli.flags.i, hrefs: cli.flags.hrefs, after: cli.flags.after});
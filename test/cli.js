const permaloom = await new (await require("./index.js"));

const cli = require("meow")(`
Usage
$ archive <url>

Options
--url, -u
--i, -i
--hrefs, -h
--after, -a

Examples
`, {
    flags: {
        key: {type: string, alias: "k"},
        i: {type: number, alias: "i", default: 1},
        hrefs: {type: boolean, alias: "h"},
        after: {type: number, alias: "a"}
    }
});

permaloom.archive({url: cli.input[0], key: JSON.parse(cli.flags.key), i: cli.flags.i, hrefs: cli.flags.hrefs, after: cli.flags.after});
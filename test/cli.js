(async () => {
    const permaloom = await new (await require("./index.js"));

    const cli = require("meow")(`
    Usage
    $ archive <url>

    Options
    Read README for information on what these values do.

    url [string]
    key [string] Key object string
    --i, -i
    --hrefs, -h
    --after, -a

    Examples
    $ archive https://www.youtube.com/watch?v=jNQXAC9IVRw <key> -i 1 -h -a 1588230344423 
    `, {
        flags: {
            i: {type: "number", alias: "i"},
            hrefs: {type: "boolean", alias: "h"},
            after: {type: "number", alias: "a"}
        }
    });
    
    if (cli.input[1]) key = JSON.parse(JSON.stringify(cli.input[1]));
    await permaloom.archive({url: cli.input[0], key: key, i: cli.flags.i, hrefs: cli.flags.hrefs, after: cli.flags.after});
})();
#!/usr/bin/node
import cliPalette from "./cli.js";
async function main() {
    try {
        await cliPalette();
    }
    catch (error) {
        if (error instanceof Error)
            console.log(error.message);
    }
}
main();

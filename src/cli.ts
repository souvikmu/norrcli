import process from "process";
import { Command } from "commander";
import { queryParser } from "./app.js";
import {
	logRandomResponse,
	logCategoryResponse,
	logArrayResponse,
	logAvailableCategories,
} from "./helpers.js";

export default async function cliPalette() {
	const cli = new Command();
	const BASE = "https://api.chucknorris.io/jokes/";

	cli.name("norrcli")
		.description("A CLI to fetch jokes about Chuck Norris")
		.version("1.0.0")
		.usage("norris [Options] <Values>");

	cli.command("category")
		.option("-c, --category <string>", "string containing categories")
		.action(async options => {
			try {
				const categories: Array<string> = queryParser(options.category);
				return await logCategoryResponse(BASE, ...categories);
			} catch (error) {
				if (error instanceof Error) console.log(error.message);
			}
		})
		.description("category wise joke");

	cli.command("query")
		.option("-q, --queries <string>", "string containing free queries")
		.action(async options => {
			try {
				const queries: Array<string> = queryParser(options.queries);
				return await logArrayResponse(BASE, ...queries);
			} catch (error) {
				if (error instanceof Error) console.log(error.message);
			}
		})
		.description("query wise joke");

	cli.command("random")
		.action(async () => await logRandomResponse(BASE))
		.description("random topic joke");

	cli.command("ac")
		.action(async () => await logAvailableCategories("categories", BASE))
		.description("displays available and valid categories");

	cli.parseAsync(process.argv);
}

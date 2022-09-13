import { apiCategoryResponse, apiFreeQueryResponse, availableCategories, } from "./app.js";
import chalk from "chalk";
const errorLog = chalk.redBright;
const consoleLog = chalk.greenBright;
// log joke response
async function logCategoryResponse(base, ...categories) {
    categories.map(async (_) => {
        try {
            const joke = await apiCategoryResponse(`random?category=${_}`, base);
            console.log(`${consoleLog(_)}: ${joke}`);
        }
        catch (error) {
            if (error instanceof Error)
                console.log(errorLog(error.message));
        }
    });
}
// log array response
async function logArrayResponse(base, ...queries) {
    queries.forEach(async (query) => {
        try {
            const jokeArr = await apiFreeQueryResponse(`search?query=${query}`, base);
            jokeArr.map((_, i) => console.log(`${consoleLog(query)}: ${i + 1} ${_.value}`));
        }
        catch (error) {
            if (error instanceof Error)
                console.log(errorLog(error.message));
        }
    });
}
// log random options
async function logRandomResponse(base) {
    try {
        const randomJoke = await apiCategoryResponse("random", base);
        console.log(`${consoleLog("random")}: ${randomJoke}`);
    }
    catch (error) {
        if (error instanceof Error)
            console.log(errorLog(error.message));
    }
}
// log valid categories
async function logAvailableCategories(endpoint, base) {
    try {
        const categories = await availableCategories(endpoint, base);
        console.log(consoleLog(categories));
    }
    catch (error) {
        if (error instanceof Error)
            console.log(errorLog(error.message));
    }
}
export { logRandomResponse, logCategoryResponse, logArrayResponse, logAvailableCategories, };

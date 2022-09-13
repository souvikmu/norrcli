import axios from "axios";
import IJokeDataResp from "./interfaces/IJokeDataResp.js";
import IJokeDataQueryResp from "./interfaces/IJokeDataQueryResp.js";
import { baseString } from "./types/types.js";

const BASE = "https://api.chucknorris.io/jokes/";

// axios promise response
async function apiResponse<U>(endpoint: string, base: URL | string) {
	const url = new URL(endpoint, base).toString();
	return await axios.get<U>(url, { validateStatus: () => true });
}

// category wise search
async function apiCategoryResponse(
	endpoint: string,
	base: baseString
): Promise<string> {
	try {
		const response = await apiResponse<IJokeDataResp>(endpoint, base);
		const { data, status } = response;
		if (status !== 200)
			throw new Error(`erronous reponse, status: ${status}`);
		if (!data) throw new Error("invalid data response");
		const { value } = data;
		if (!value) return "no joke found on the category";
		return value;
	} catch (error) {
		throw error;
	}
}

// query wise search
async function apiFreeQueryResponse(
	endpoint: string,
	base: baseString
): Promise<Array<IJokeDataResp>> {
	const response = await apiResponse<IJokeDataQueryResp>(endpoint, base);
	const { data, status } = response;
	if (status !== 200) throw new Error(`erronous reponse, status: ${status}`);
	if (!data) throw new Error("invalid data response");
	const { result, total } = data;
	if (total === 0) throw new Error("no joke was found on the query");
	return result;
}

// search available categories
async function availableCategories(
	endpoint: string,
	base: baseString
): Promise<Array<string>> {
	const response = await apiResponse<Array<string>>(endpoint, base);
	const { data, status } = response;
	if (status !== 200) throw new Error(`erronous response, status: ${status}`);
	if (!data) throw new Error("error occured fetching data");
	return data;
}

// parse terminal query
function queryParser(queryString: string) {
	if (!queryString) throw new Error("invalid argument string");
	const regexp = /^[^\W](([a-zA-Z\s,;])+)$/g;
	const matched = queryString.match(regexp);
	if (!matched) throw new Error("invalid argument pattern");
	const result = matched.toString().toLowerCase().trim();
	const parsed = result
		.toString()
		.split(/[,;\s]/g)
		.filter(_ => _ !== "");
	return parsed;
}

export {
	apiCategoryResponse,
	apiFreeQueryResponse,
	availableCategories,
	queryParser,
};

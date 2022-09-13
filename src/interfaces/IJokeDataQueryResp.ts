import IJokeDataResp from "./IJokeDataResp";

export default interface IJokeDataQueryResp {
	total?: number;
	result: Array<IJokeDataResp>;
}

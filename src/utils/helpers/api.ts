import { isObject } from "./index";

export const apiFormErrorExtractor = (errorResponse: any) =>
	[...(errorResponse?.response?.data?.flashes?.["danger"] || [])].find(isObject);

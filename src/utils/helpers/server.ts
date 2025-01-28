import httpStatus from "http-status";

// constants
export const SUCCESS_STATUS_CODE = [
	httpStatus.CREATED, // 201 - Created
	httpStatus.OK, // 200 - OK
	httpStatus.ACCEPTED, // 202 - Accepted
	httpStatus.NO_CONTENT, // 204 - No Content
];
export const ERROR_STATUS_CODE = [
	httpStatus.BAD_REQUEST, // 400 - Bad Request
	httpStatus.UNAUTHORIZED, // 401 - Unauthorized
	httpStatus.FORBIDDEN, // 403 - Forbidden
	httpStatus.NOT_FOUND, // 404 - Not Found
	httpStatus.METHOD_NOT_ALLOWED, // 405 - Method Not Allowed
	httpStatus.NOT_ACCEPTABLE, // 406 - Not Acceptable
	httpStatus.CONFLICT, // 409 - Conflict
	httpStatus.UNPROCESSABLE_ENTITY, // 422 - Unprocessable Entity
	httpStatus.TOO_MANY_REQUESTS, // 429 - Too Many Requests
	httpStatus.INTERNAL_SERVER_ERROR, // 500 - Internal Server Error
];

// interfaces
export interface PaginateResult {
	totalDocs: number;
	limit: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	page?: number | undefined;
	totalPages: number;
	offset: number;
	prevPage?: number | null | undefined;
	nextPage?: number | null | undefined;
	pagingCounter: number;
}

// types
export type SuccessStatusCodeType = (typeof SUCCESS_STATUS_CODE)[number];
export type ErrorStatusCodeType = (typeof ERROR_STATUS_CODE)[number];
export type SortItemType<T extends string = string> = {
	name: string;
	value: { [_K in T]?: 1 | -1 } & { [_K in Exclude<T, keyof any>]?: never };
};
export type MetaDataType = {
	pagination: PaginateResult;
	sort: SortItemType[];
};
export type FormatResponseSuccessObjectType<T> = {
	success: true;
	status: SuccessStatusCodeType;
	entities: { data: T; stats?: never; meta?: MetaDataType | never };
	redirectURL?: string;
	error?: never;
	flashes?: { [key: string]: string[] };
	message?: string;
};
export type FormatResponseErrorObjectType = {
	success: false;
	status: ErrorStatusCodeType;
	entities?: never;
	error: Error;
	flashes?: { [key: string]: string[] };
	message?: string;
};

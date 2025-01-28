export * from "./api";
export * from "./dom";
export * from "./server";
export * from "./user";

export const isFunction = (value: unknown) => typeof value === "function";

export const isObject = (value: any) =>
	typeof value === "object" && !Array.isArray(value) && value !== null;

export const percentage = (
	val: number | "infinity",
	total: number,
	opts: { decimal?: number; percentageSign?: boolean }
): string => {
	const { decimal = 0, percentageSign = false } = opts;

	if (typeof val == "number") {
		if (total) {
			if (typeof total == "number" && total === total) {
				return `${((val / total) * 100).toFixed(decimal)}${percentageSign ? "%" : ""}`;
			} else {
				return "";
			}
		} else {
			return `${(Number(val) * 100).toFixed(decimal)}${percentageSign ? "%" : ""}`;
		}
	} else if (typeof val === "string" && val.toLowerCase() === "infinity") {
		return "∞";
	} else {
		return "";
	}
};

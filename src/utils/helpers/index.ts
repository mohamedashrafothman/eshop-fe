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

/**
 * Picks specific properties from an object and returns a new object containing those properties.
 *
 * @param {Object} object - The source object to pick properties from.
 * @param {string[]} keys - An array of keys to select from the object.
 * @throws {Error} Throws an error if the object is null or undefined.
 * @throws {Error} Throws an error if keys is not an array.
 * @throws {Error} Throws an error if a key does not exist on the object.
 * @returns {Object} A new object containing only the specified keys from the original object.
 */
export const pick = (object: { [key: string]: any }, keys: string[]): object => {
	// Check if the object is null or undefined
	if (!object) {
		throw new Error("pick() method was called with a null or undefined object");
	}
	// Check if keys is an array
	if (!Array.isArray(keys)) {
		throw new Error("pick() method was called with a non-array as the 'keys' parameter");
	}
	// Use reduce to build a new object with the specified keys
	return keys.reduce((obj: { [key: string]: any }, key) => {
		// Check if the key exists in the object
		if (object.hasOwnProperty(key)) {
			// Assign the value to the new object
			obj[key] = object[key];
		}
		return obj;
	}, {});
};

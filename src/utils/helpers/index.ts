export * from "./api";
export * from "./dom";
export * from "./form";
export * from "./server";
export * from "./user";

export const isFunction = (value: unknown): boolean => typeof value === "function";

export const isObject = (value: unknown): boolean =>
	typeof value === "object" && !Array.isArray(value) && value !== null;

export const isString = (value: unknown): boolean => typeof value === "string";

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

export const omit = (obj: { [key: string]: any }, keys: string[]) =>
	Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

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
export const pick = <T extends Record<string, any>, K extends keyof T>(
	object: T,
	keys: K[]
): Pick<T, K> => {
	// Check if the object is null or undefined
	if (!object) {
		throw new Error("pick() method was called with a null or undefined object");
	}
	// Check if keys is an array
	if (!Array.isArray(keys)) {
		throw new Error("pick() method was called with a non-array as the 'keys' parameter");
	}
	// Use reduce to build a new object with the specified keys
	return keys.reduce(
		(obj, key) => {
			// Check if the key exists in the object
			if (Object.prototype.hasOwnProperty.call(object, key)) {
				// Assign the value to the new object
				obj[key] = object[key];
			}
			return obj;
		},
		{} as Pick<T, K>
	);
};

export const filterObjectFalsyValues = (obj: { [key: string]: any }) =>
	Object.keys(obj).reduce((acc: { [key: string]: any }, key) => {
		if (obj[key]) acc[key] = obj[key];
		return acc;
	}, {});

export const countDownTimer = (
	date: number | null
): { seconds: number; minutes: number; hours: number; days: number } => {
	if (date === null) return { seconds: 0, minutes: 0, hours: 0, days: 0 };
	const distance = new Date(date).getTime() - new Date().getTime();
	const _second = 1000;
	const _minute = _second * 60;
	const _hour = _minute * 60;
	const _day = _hour * 24;
	if (distance < 0) return { seconds: 0, minutes: 0, hours: 0, days: 0 };
	return {
		seconds: Math.floor((distance % _minute) / _second),
		minutes: Math.floor((distance % _hour) / _minute),
		hours: Math.floor((distance % _day) / _hour),
		days: Math.floor(distance / _day),
	};
};

import vars from "utils/vars";
import isStrongPassword from "validator/lib/isStrongPassword";
import { AnyObjectSchema, AnySchema } from "yup";

export const isSameValueAsInitialValue = (v: any, init: any) =>
	JSON.stringify(v) === JSON.stringify(init);

export const objectToFormData = (
	obj: Record<string, any>,
	rootName: string = "",
	ignoreList: string[] = []
): FormData => {
	const formData = new FormData();

	const ignore = (root: string) => Array.isArray(ignoreList) && ignoreList.includes(root);

	const appendFormData = (data: any, root: string) => {
		if (ignore(root)) return;

		root = root || "";

		// Handle File types
		if (data instanceof File) {
			formData.append(root, data);
			return;
		}

		// Handle array types
		if (Array.isArray(data)) {
			if (!data.length) {
				formData.append(root, "");
				return;
			}
			data.forEach((d, i) => appendFormData(d, `${root}[${i}]`));
			return;
		}

		// Handle object types
		if (typeof data === "object" && data) {
			for (const key in data) {
				if (Object.prototype.hasOwnProperty.call(data, key)) {
					appendFormData(data[key], root === "" ? key : `${root}[${key}]`);
				}
			}
			return;
		}

		// Handle the rest types without null or undefined
		if (data !== null && data !== undefined) {
			formData.append(root, data);
		}
	};

	appendFormData(obj, rootName);
	return formData;
};

export const fileSizeValidation = function (file: any) {
	return Boolean(
		!!!file ||
			(Array.from([file])?.filter((file) => file?.size)?.length &&
				Array.from([file])?.every(
					(file) => file?.size <= vars.app.fileMaxSizeInMB * 1024 * 1024
				))
	);
};

export const fileFormatValidation = function (file: any) {
	return Boolean(
		!!!file ||
			(Array.from([file])?.filter((file) => file?.type)?.length &&
				Array.from([file])?.every((file) =>
					vars.app.imagesFileInputAccepts.includes(file?.type)
				))
	);
};

export const passwordValidation = function (value: string = "") {
	return Boolean(value && isStrongPassword(value, { minLength: 8 }) && value.length < 64);
};

const normalizePath = (path: string): string[] =>
	path
		.replace(/\[(?:'([^']+)'|"([^"]+)"|([^\]]+))\]/g, (_, single, double, bare) => {
			return "." + (single || double || bare);
		})
		.split(".");

export const isFieldRequired = (fieldPath: string, schema: AnyObjectSchema): boolean => {
	const parts = normalizePath(fieldPath);
	let currentSchema: AnySchema | undefined = schema;

	for (const part of parts) {
		const fields = (currentSchema as any)?.fields as any;
		if (!fields || !(part in fields)) return false;
		currentSchema = fields[part];
	}

	if (!currentSchema) return false;

	const spec = (currentSchema as AnySchema).spec;
	return spec?.optional === false;
};

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

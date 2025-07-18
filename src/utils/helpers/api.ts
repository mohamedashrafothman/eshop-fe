import { AxiosErrorProps } from "config/axios";
import { FormikErrors } from "formik";
import { isObject } from "./index";

type ErrorObject = Record<string, string>;
type NestedErrorObject = Record<string, any>;

export const unFlattenErrors = (errors: ErrorObject): NestedErrorObject =>
	Object.entries(errors).reduce((acc, [key, value]) => {
		const keys = key.split(".");
		let current = acc;

		keys.forEach((k, i) => {
			if (i === keys.length - 1) {
				current[k] = value;
			} else {
				current[k] = current[k] || {};
				current = current[k];
			}
		});

		return acc;
	}, {} as NestedErrorObject);

export const apiFormErrorExtractor = <D = any>(
	errorResponse: AxiosErrorProps
): FormikErrors<D> | undefined =>
	unFlattenErrors(
		[...((errorResponse?.response?.data?.flashes?.["danger"] as any) || [])].find(isObject)
	);

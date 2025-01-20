import { AxiosErrorProps } from "config/axios";
import { FormikErrors } from "formik";
import { isObject } from "./index";

export const apiFormErrorExtractor = <D = any>(
	errorResponse: AxiosErrorProps
): FormikErrors<D> | undefined =>
	[...((errorResponse?.response?.data?.flashes?.["danger"] as any) || [])].find(isObject);

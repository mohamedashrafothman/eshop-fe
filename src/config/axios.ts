import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
	type FormatResponseErrorObjectType,
	type FormatResponseSuccessObjectType,
} from "utils/helpers";
import vars from "utils/vars";

export type AxiosResponseProps<T = any, D = any> = AxiosResponse<
	FormatResponseSuccessObjectType<T>,
	D
>;
export type AxiosErrorProps = AxiosError<FormatResponseErrorObjectType>;
export type IsAxiosCancelError = typeof axios.isCancel;
export type IsAxiosError = typeof axios.isAxiosError;

const config: AxiosRequestConfig = { baseURL: vars.app.baseUrl, headers: vars.api.headers };
const axiosInstance: AxiosInstance = axios.create(config);

export const isAxiosCancelError: IsAxiosCancelError = axios.isCancel;
export const isAxiosError: IsAxiosError = axios.isAxiosError;

export { type AxiosInstance, type AxiosRequestConfig };
export default axiosInstance;

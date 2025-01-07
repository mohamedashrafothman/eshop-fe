import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import vars from "utils/vars";

export type AxiosRequestProps<D = any, v = any> = AxiosRequestConfig<D> & { variables?: v };
export type AxiosResponseProps<T = any, D = any> = Pick<
	AxiosResponse<{ entities: { data: T } }, D>,
	"data"
>["data"];
export type AxiosErrorProps = AxiosError<{
	error?: any | undefined;
	flashes?: { [key: string]: { [key: string]: string }[] } | undefined;
	message?: string | undefined;
	entities?: never | undefined;
}>;
export type IsAxiosCancelError = typeof axios.isCancel;
export type IsAxiosError = typeof axios.isAxiosError;

const config: AxiosRequestConfig = { baseURL: vars.app.baseUrl, headers: vars.api.headers };
const axiosInstance: AxiosInstance = axios.create(config);

export const axiosRequest = <D = any, v = any>(options: AxiosRequestProps<D, v>) =>
	axiosInstance(options).then(({ data }) => data);
export const isAxiosCancelError: IsAxiosCancelError = axios.isCancel;
export const isAxiosError: IsAxiosError = axios.isAxiosError;

export { type AxiosInstance, type AxiosRequestConfig };
export default axiosInstance;

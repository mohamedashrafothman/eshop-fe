import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	isCancel,
} from "axios";
import vars from "utils/vars";

export type AxiosRequestProps<D = any> = AxiosRequestConfig<D> & { query?: { [key: string]: any } };
export type AxiosErrorProps = AxiosError<{
	error?: any;
	flashes?: { [key: string]: string[] };
	message?: string;
	entities?: any;
}>;
export type IsAxiosCancelError = typeof isCancel;
export type IsAxiosError = typeof axios.isAxiosError;

const config: AxiosRequestConfig = { baseURL: vars.app.baseUrl, headers: vars.api.headers };
const axiosInstance: AxiosInstance = axios.create(config);

export const axiosRequest = (options: AxiosRequestProps) =>
	axiosInstance(options).then(({ data }) => data);
export const isAxiosCancelError: IsAxiosCancelError = axios.isCancel;
export const isAxiosError: IsAxiosError = axios.isAxiosError;

export { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse };
export default axiosInstance;

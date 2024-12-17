import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	isAxiosError,
	isCancel,
} from "axios";
import vars from "utils/vars";

export type AxiosRequestProps = { query?: { [key: string]: any } } & AxiosRequestConfig;
interface PromiseWithCancel<T> extends Promise<T> {
	cancel: () => void;
}

const axiosInstance: AxiosInstance = axios.create({
	baseURL: vars.app.baseUrl,
	headers: vars.api.headers,
	timeout: 10000,
});
export const axiosRequest = (options: AxiosRequestProps) =>
	axiosInstance(options) as PromiseWithCancel<any>;

export {
	isAxiosError,
	isCancel,
	type AxiosError,
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
};
export default axiosInstance;

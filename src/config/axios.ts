import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	isCancel,
} from "axios";
import vars from "utils/vars";

type AxiosRequestProps<D = any> = AxiosRequestConfig<D> & { query?: { [key: string]: any } };
type AxiosErrorProps = AxiosError<{ error: any; errors: any; message: string; data: any }>;
type IsAxiosCancelError = typeof isCancel;
type IsAxiosError = typeof axios.isAxiosError;

const config: AxiosRequestConfig = {
	baseURL: vars.app.baseUrl,
	headers: vars.api.headers,
	timeout: 10000,
};

const axiosInstance: AxiosInstance = axios.create(config);
const axiosRequest = (options: AxiosRequestProps) =>
	axiosInstance(options).then(({ data }) => ({ data }));
const isAxiosCancelError: IsAxiosCancelError = axios.isCancel;
const isAxiosError: IsAxiosError = axios.isAxiosError;

export {
	axiosRequest,
	isAxiosCancelError,
	isAxiosError,
	type AxiosErrorProps,
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosRequestProps,
	type AxiosResponse,
};
export default axiosInstance;

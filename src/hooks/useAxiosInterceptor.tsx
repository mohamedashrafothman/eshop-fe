import axiosInstance, { isCancel } from "config/axios";
import { useCallback, useLayoutEffect } from "react";

const useAxiosInterceptor = () => {
	// event handlers
	const requestSuccessInterceptor = useCallback((config: any) => {
		// TODO: handle request headers to attach authentication, and other headers.

		return config;
	}, []);

	const requestErrorInterceptor = useCallback((error: any) => {
		// TODO: handle request errors.

		return Promise.reject(error);
	}, []);

	const responseSuccessInterceptor = useCallback((response: any) => {
		// TODO: handle response and response global response handling.

		return response;
	}, []);

	const responseErrorInterceptor = useCallback((error: any) => {
		// TODO: handle response errors

		if (isCancel(error)) return Promise.reject(error);

		return Promise.reject(error);
	}, []);

	// layout effects
	useLayoutEffect(() => {
		// add request interceptors
		const requestInterceptor = axiosInstance.interceptors.request.use(
			requestSuccessInterceptor,
			requestErrorInterceptor
		);

		return () => {
			// clean up request interceptors
			axiosInstance.interceptors.request.eject(requestInterceptor);
		};
	}, [requestErrorInterceptor, requestSuccessInterceptor]);

	useLayoutEffect(() => {
		// add response interceptors
		const responseInterceptor = axiosInstance.interceptors.response.use(
			responseSuccessInterceptor,
			responseErrorInterceptor
		);

		return () => {
			// clean up response interceptors
			axiosInstance.interceptors.response.eject(responseInterceptor);
		};
	}, [responseErrorInterceptor, responseSuccessInterceptor]);
};

export default useAxiosInterceptor;

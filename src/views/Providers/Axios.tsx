"use client";

import axiosInstance, { isAxiosCancelError, isAxiosError, type AxiosInstance } from "config/axios";
import { useCallback, useLayoutEffect } from "react";

type Props = { children?: React.ReactNode; instance?: AxiosInstance };

const Axios = ({ children, instance = axiosInstance }: Props) => {
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
		if (isAxiosCancelError(error) || isAxiosError(error)) return Promise.reject(error);
		return Promise.reject(error);
	}, []);

	// layout effects
	useLayoutEffect(() => {
		// add request interceptors
		const requestInterceptor = instance.interceptors.request.use(
			requestSuccessInterceptor,
			requestErrorInterceptor
		);

		return () => {
			// clean up request interceptors
			instance.interceptors.request.eject(requestInterceptor);
		};
	}, [requestErrorInterceptor, requestSuccessInterceptor]);

	useLayoutEffect(() => {
		// add response interceptors
		const responseInterceptor = instance.interceptors.response.use(
			responseSuccessInterceptor,
			responseErrorInterceptor
		);

		return () => {
			// clean up response interceptors
			instance.interceptors.response.eject(responseInterceptor);
		};
	}, [responseErrorInterceptor, responseSuccessInterceptor]);

	return <>{children}</>;
};

export default Axios;

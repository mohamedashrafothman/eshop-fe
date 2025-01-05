"use client";

import axiosInstance, { isAxiosCancelError, type AxiosInstance } from "config/axios";
import { useSession } from "next-auth/react";
import { useCallback, useLayoutEffect } from "react";
import { toast } from "react-toastify";

type Props = { children?: React.ReactNode; instance?: AxiosInstance };

const Axios = ({ children, instance = axiosInstance }: Props) => {
	const { data: session } = useSession();

	// event handlers
	const requestSuccessInterceptor = useCallback(
		(config: any) => ({
			...config,
			headers: {
				...config.headers,
				...(session?.accessToken && session?.tokenType
					? { authorization: `${session.tokenType} ${session.accessToken}` }
					: {}),
			},
		}),
		[]
	);

	const requestErrorInterceptor = useCallback((error: any) => Promise.reject(error), []);

	const responseSuccessInterceptor = useCallback((response: any) => {
		// extract response data.
		const { data: { message = null, flashes = {} } = {} } = response;

		// handle flash messages
		if (message) toast.error(message);
		if (Object.keys(flashes).length)
			Object.keys(flashes).forEach((messageType) =>
				flashes[messageType].forEach((singleMessage: string) => {
					if (typeof singleMessage !== "string") return;
					toast(singleMessage, {
						type:
							messageType === "success"
								? "success"
								: messageType === "danger"
									? "error"
									: messageType === "info"
										? "info"
										: "warning",
					});
				})
			);

		return response;
	}, []);

	const responseErrorInterceptor = useCallback((responseError: any = {}) => {
		if (isAxiosCancelError(responseError)) return Promise.reject(responseError);

		// extract error response data.
		const { response: { data: { message = null, error, flashes = {} } = {}, status } = {} } =
			responseError;

		// handle flash messages
		if (message) toast.error(message);
		if (Object.keys(flashes).length)
			Object.keys(flashes).forEach((messageType) =>
				flashes[messageType].forEach((singleMessage: string) => {
					if (typeof singleMessage !== "string") return;
					toast(singleMessage, {
						type:
							messageType === "success"
								? "success"
								: messageType === "danger"
									? "error"
									: messageType === "info"
										? "info"
										: "warning",
					});
				})
			);

		return Promise.reject(responseError);
	}, []);

	// layout effects
	useLayoutEffect(() => {
		// add request interceptors
		const requestInterceptor = instance.interceptors.request.use(
			requestSuccessInterceptor,
			requestErrorInterceptor
		);

		// clean up request interceptors
		return () => {
			instance.interceptors.request.eject(requestInterceptor);
		};
	}, [requestErrorInterceptor, requestSuccessInterceptor]);

	useLayoutEffect(() => {
		// add response interceptors
		const responseInterceptor = instance.interceptors.response.use(
			responseSuccessInterceptor,
			responseErrorInterceptor
		);

		// clean up response interceptors
		return () => {
			instance.interceptors.response.eject(responseInterceptor);
		};
	}, [responseErrorInterceptor, responseSuccessInterceptor]);

	return <>{children}</>;
};

export default Axios;

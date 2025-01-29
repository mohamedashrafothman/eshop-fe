"use client";

import { useQueryClient } from "@tanstack/react-query";
import to from "await-to-js";
import axiosInstance, { isAxiosCancelError, type AxiosInstance } from "config/axios";
import httpStatus from "http-status";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTransitionRouter } from "next-view-transitions";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { toast } from "react-toastify";
import { postRefreshToken, type PostRefreshTokenResponseType } from "services/api/e-shop/auth";

type Props = { children?: React.ReactNode | undefined; instance?: AxiosInstance | undefined };

const Axios = ({ children, instance = axiosInstance }: Props) => {
	const { push } = useTransitionRouter();
	const { data: session } = useSession();
	const queryClient = useQueryClient();

	// ref hook
	const refreshTokenCancelRequestRef = useRef<AbortController | null>(null);

	// event handlers
	const requestSuccessInterceptor = useCallback(
		(request: any) => {
			// Add the access token to the request headers
			if (session?.tokenType && session?.accessToken)
				request.headers["Authorization"] = `${session.tokenType} ${session.accessToken}`;

			// Return modified request
			return request;
		},
		[session?.accessToken, session?.tokenType]
	);

	const requestErrorInterceptor = useCallback((error: any) => Promise.reject(error), []);

	const responseSuccessInterceptor = useCallback((response: any) => {
		// Extract response data.
		const { data: { message = null, flashes = {} } = {} } = response;

		// Handle flash messages
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

	const responseErrorInterceptor = useCallback(
		async (responseError: any = {}) => {
			// Ignore axios cancel errors
			if (isAxiosCancelError(responseError)) return Promise.reject(responseError);

			// Extract error response data.
			const {
				response: { data: { message = null, error, flashes = {} } = {}, status } = {},
				config: originalRequest,
			} = responseError;

			// Handle flash messages
			if (![status, originalRequest.status].includes(httpStatus.UNAUTHORIZED)) {
				if (error?.message || message) toast.error(error?.message || message);
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
			}

			// Handle 401 status code error.
			if (
				status === httpStatus.UNAUTHORIZED &&
				!originalRequest._retry &&
				session?.refreshToken
			) {
				// Mark the request as retried to avoid infinite loops.
				originalRequest._retry = true;

				// Abort any previous request, and create a new abort controller.
				if (refreshTokenCancelRequestRef.current?.signal)
					refreshTokenCancelRequestRef.current?.abort();
				refreshTokenCancelRequestRef.current = new AbortController();

				// Make a request to your auth server to refresh the token.
				const [refreshTokenError, refreshTokenResponse] = await to(
					postRefreshToken({
						data: { refreshToken: session.refreshToken },
						signal: refreshTokenCancelRequestRef.current.signal,
					})
				);

				// Handle refresh token errors by signing out and redirecting to the login page.
				if (refreshTokenError || !refreshTokenResponse) {
					await signOut({ callbackUrl: "/auth/login" });
					return Promise.reject(responseError);
				}

				// Extract tokens data from the response.
				const {
					accessToken = "",
					refreshToken = "",
					tokenType = "",
				} = refreshTokenResponse.data.entities.data as PostRefreshTokenResponseType;

				// Update next-auth session tokens.
				const result = await signIn("credentials", {
					...session,
					...(accessToken && { accessToken: JSON.stringify(accessToken) }),
					...(refreshToken && { refreshToken: JSON.stringify(refreshToken) }),
					...(tokenType && { tokenType: JSON.stringify(tokenType) }),
					redirect: false,
				});

				// Handle sign in errors by signing out and redirecting to the login page.
				if (!result?.ok) {
					await signOut({ callbackUrl: "/auth/login" });
					return Promise.reject(responseError);
				}

				// Retry the original request with the new access token or invalidate the query.
				return setTimeout(() => {
					if (originalRequest?.queryKey)
						return queryClient.invalidateQueries({
							queryKey: originalRequest.queryKey,
						});
					return instance(originalRequest);
				}, 0);
			}

			// Handling 404 status code error.
			if (status === httpStatus.NOT_FOUND) push("/not-found");

			// Return rejected promise
			return Promise.reject(responseError);
		},
		[instance, push, queryClient, session?.refreshToken, session?.user]
	);

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
	}, [instance.interceptors.request, requestErrorInterceptor, requestSuccessInterceptor]);

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
	}, [instance.interceptors.response, responseErrorInterceptor, responseSuccessInterceptor]);

	useEffect(() => {
		return () => {
			if (refreshTokenCancelRequestRef.current?.signal)
				refreshTokenCancelRequestRef.current?.abort();
		};
	}, []);

	return <>{children}</>;
};

export default Axios;

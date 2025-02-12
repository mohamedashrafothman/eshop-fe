import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { KEY_ARRAY as ME_KEY_QUERY } from "hooks/useMeQuery";
import { signIn } from "next-auth/react";
import { useTransitionRouter } from "next-view-transitions";
import {
	postRegister as mutationFn,
	type PostRegisterDataType,
	type PostRegisterResponseType,
} from "services/api/e-shop/auth";

export const KEY_ARRAY = ["auth", "register"];

const useRegisterMutation = () => {
	const { push } = useTransitionRouter();
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, {
		mutationFn,
		onSuccess: async (response) => {
			// Remove the me query from the cache.
			queryClient.removeQueries({ queryKey: ME_KEY_QUERY, exact: true });
			// Extract user, and tokens data from the response.
			const {
				accessToken = "",
				refreshToken = "",
				tokenType = "",
				...user
			} = response?.data?.entities?.data || {};
			// Call the signIn function from next-auth.
			if (accessToken || refreshToken || tokenType || user)
				await signIn("credentials", {
					...(accessToken && { accessToken: JSON.stringify(accessToken) }),
					...(refreshToken && { refreshToken: JSON.stringify(refreshToken) }),
					...(tokenType && { tokenType: JSON.stringify(tokenType) }),
					...(user && { user: JSON.stringify(user) }),
					redirect: false,
				});
			// Redirect to the dashboard after success login.
			push(!user.emailVerified ? "/user/email/verify" : "/dashboard");
		},
	});

	return useMutation<
		AxiosResponseProps<PostRegisterResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostRegisterDataType>
	>({ mutationKey: KEY_ARRAY });
};

export default useRegisterMutation;

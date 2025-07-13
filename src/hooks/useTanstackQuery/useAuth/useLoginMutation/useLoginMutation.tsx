import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { LOGIN_KEY_ARRAY } from "hooks/useTanstackQuery/useAuth";
import { ME_KEY_ARRAY } from "hooks/useTanstackQuery/useUsers";
import { signIn } from "next-auth/react";
import { useTransitionRouter } from "next-view-transitions";
import {
	postLogin as mutationFn,
	type PostLoginDataType,
	type PostLoginResponseType,
} from "services/api/e-shop/auth";
import { pick } from "utils/helpers";

const useLoginMutation = () => {
	const queryClient = useQueryClient();
	const { push } = useTransitionRouter();

	queryClient.setMutationDefaults(LOGIN_KEY_ARRAY, {
		mutationFn,
		onSuccess: async (response) => {
			// Remove the me query from the cache.
			queryClient.removeQueries({ queryKey: ME_KEY_ARRAY, exact: true });
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
					...(user && {
						user: JSON.stringify(pick(user, ["_id", "name", "role", "emailVerified"])),
					}),
					redirect: false,
				});
			// Redirect to the dashboard after success login.
			push("/dashboard");
		},
	});

	return useMutation<
		AxiosResponseProps<PostLoginResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostLoginDataType>
	>({ mutationKey: LOGIN_KEY_ARRAY });
};

export default useLoginMutation;

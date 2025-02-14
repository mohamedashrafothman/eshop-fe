import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { KEY_ARRAY as ME_KEY_QUERY } from "hooks/useMeQuery";
import { signIn, useSession } from "next-auth/react";
import {
	postUnlinkSocialMedia as mutationFn,
	type OAuthProviderNamesType,
	type PostUnlinkSocialMediaDataType,
	type PostUnlinkSocialMediaResponseType,
} from "services/api/e-shop/auth";

export const KEY_ARRAY = ["auth", "login", "social", "unlink"];

const useUnlinkSocialQuery = () => {
	const queryClient = useQueryClient();
	const { data: session } = useSession();

	queryClient.setMutationDefaults(KEY_ARRAY, {
		mutationFn,
		onSuccess: async (response) => {
			// Remove the me query from the cache.
			queryClient.removeQueries({ queryKey: ME_KEY_QUERY, exact: true });
			// Extract user, and tokens data from the response.
			const user = response?.data?.entities?.data || {};
			// Call the signIn function from next-auth.
			if (user)
				await signIn("credentials", {
					...(session?.accessToken && {
						accessToken: JSON.stringify(session.accessToken),
					}),
					...(session?.refreshToken && {
						refreshToken: JSON.stringify(session.refreshToken),
					}),
					...(session?.tokenType && { tokenType: JSON.stringify(session.tokenType) }),
					...(user && { user: JSON.stringify(user) }),
					redirect: false,
				});
		},
	});

	return useMutation<
		AxiosResponseProps<PostUnlinkSocialMediaResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostUnlinkSocialMediaDataType> & {
			variables: { providerName: OAuthProviderNamesType };
		}
	>({ mutationKey: KEY_ARRAY });
};

export default useUnlinkSocialQuery;

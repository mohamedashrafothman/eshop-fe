import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { UNLINK_LOGIN_SOCIAL_KEY_ARRAY } from "hooks/useTanstackQuery/useAuth";
import { ME_KEY_ARRAY } from "hooks/useTanstackQuery/useUsers";
import { signIn, useSession } from "next-auth/react";
import {
	postUnlinkSocialMedia as mutationFn,
	type OAuthProviderNamesType,
	type PostUnlinkSocialMediaDataType,
	type PostUnlinkSocialMediaResponseType,
} from "services/api/e-shop/auth";
import { pick } from "utils/helpers";

const useUnlinkSocialQuery = () => {
	const queryClient = useQueryClient();
	const { data: session } = useSession();

	queryClient.setMutationDefaults(UNLINK_LOGIN_SOCIAL_KEY_ARRAY, {
		mutationFn,
		onSuccess: async (response) => {
			// Remove the me query from the cache.
			queryClient.removeQueries({ queryKey: ME_KEY_ARRAY, exact: true });
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
					...(user && {
						user: JSON.stringify(pick(user, ["_id", "name", "role", "emailVerified"])),
					}),
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
	>({ mutationKey: UNLINK_LOGIN_SOCIAL_KEY_ARRAY });
};

export default useUnlinkSocialQuery;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	postUnlinkSocialMedia as mutationFn,
	type OAuthProviderNamesType,
	type PostUnlinkSocialMediaDataType,
	type PostUnlinkSocialMediaResponseType,
} from "services/api/e-shop/auth";

export const KEY_ARRAY = ["auth", "login", "social", "unlink"];

const useUnlinkSocialQuery = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostUnlinkSocialMediaResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostUnlinkSocialMediaDataType> & {
			variables: { providerName: OAuthProviderNamesType };
		}
	>({ mutationKey: KEY_ARRAY });
};

export default useUnlinkSocialQuery;

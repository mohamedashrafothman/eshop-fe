import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	postLoginBySocialMedia as mutationFn,
	type OAuthProviderNamesType,
	type PostLoginBySocialMediaDataType,
	type PostLoginBySocialMediaResponseType,
} from "services/api/e-shop/auth";

export const KEY_ARRAY = ["auth", "login", "social"];

const useLoginBySocialMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostLoginBySocialMediaResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostLoginBySocialMediaDataType> & {
			variables: { providerName: OAuthProviderNamesType };
		}
	>({ mutationKey: KEY_ARRAY });
};

export default useLoginBySocialMutation;

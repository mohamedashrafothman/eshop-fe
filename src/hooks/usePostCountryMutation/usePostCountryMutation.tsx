import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	postCountry as mutationFn,
	type PostCountryDataType,
	type PostCountryResponseType,
} from "services/api/e-shop/countries";

export const KEY_ARRAY = ["countries", "post", "country"];

const usePostCountryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostCountryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostCountryDataType>
	>({ mutationKey: KEY_ARRAY });
};

export default usePostCountryMutation;

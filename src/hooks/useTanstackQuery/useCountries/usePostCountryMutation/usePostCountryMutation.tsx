import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { POST_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useCountries";
import {
	postCountry as mutationFn,
	type PostCountryDataType,
	type PostCountryResponseType,
} from "services/api/e-shop/countries";

const usePostCountryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(POST_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostCountryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostCountryDataType>
	>({ mutationKey: POST_SINGLE_KEY_ARRAY });
};

export default usePostCountryMutation;

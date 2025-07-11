import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { POST_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useCities";
import {
	postCity as mutationFn,
	type PostCityDataType,
	type PostCityResponseType,
} from "services/api/e-shop/cities";

const usePostCityMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(POST_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostCityResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostCityDataType>
	>({ mutationKey: POST_SINGLE_KEY_ARRAY });
};

export default usePostCityMutation;

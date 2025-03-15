import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	postCity as mutationFn,
	type PostCityDataType,
	type PostCityResponseType,
} from "services/api/e-shop/cities";

export const KEY_ARRAY = ["cities", "post", "city"];

const usePostCityMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostCityResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostCityDataType>
	>({ mutationKey: KEY_ARRAY });
};

export default usePostCityMutation;

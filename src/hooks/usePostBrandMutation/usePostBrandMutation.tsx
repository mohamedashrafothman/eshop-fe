import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	postBrand as mutationFn,
	type PostBrandDataType,
	type PostBrandResponseType,
} from "services/api/e-shop/brands";

export const KEY_ARRAY = ["brands", "post", "brand"];

const usePostBrandMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostBrandResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostBrandDataType>
	>({ mutationKey: KEY_ARRAY });
};

export default usePostBrandMutation;

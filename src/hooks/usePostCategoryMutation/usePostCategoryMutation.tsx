import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	postCategory as mutationFn,
	type PostCategoryDataType,
	type PostCategoryResponseType,
} from "services/api/e-shop/categories";

export const KEY_ARRAY = ["categories", "post", "category"];

const usePostCategoryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostCategoryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostCategoryDataType>
	>({ mutationKey: KEY_ARRAY });
};

export default usePostCategoryMutation;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { POST_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useCategories";
import {
	postCategory as mutationFn,
	type PostCategoryDataType,
	type PostCategoryResponseType,
} from "services/api/e-shop/categories";

const usePostCategoryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(POST_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostCategoryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostCategoryDataType>
	>({ mutationKey: POST_SINGLE_KEY_ARRAY });
};

export default usePostCategoryMutation;

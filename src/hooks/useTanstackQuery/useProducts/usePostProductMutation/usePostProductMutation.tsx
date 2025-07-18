import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { POST_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useProducts";
import {
	postProduct as mutationFn,
	type PostProductDataType,
	type PostProductResponseType,
} from "services/api/e-shop/products";

const usePostProductMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(POST_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostProductResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostProductDataType>
	>({ mutationKey: POST_SINGLE_KEY_ARRAY });
};

export default usePostProductMutation;

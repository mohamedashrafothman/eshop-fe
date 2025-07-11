import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { POST_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useBrands";
import {
	postBrand as mutationFn,
	type PostBrandDataType,
	type PostBrandResponseType,
} from "services/api/e-shop/brands";

const usePostBrandMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(POST_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostBrandResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostBrandDataType>
	>({ mutationKey: POST_SINGLE_KEY_ARRAY });
};

export default usePostBrandMutation;

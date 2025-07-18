import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { PATCH_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useProducts";
import {
	patchProduct as mutationFn,
	type PatchProductDataType,
	type PatchProductResponseType,
} from "services/api/e-shop/products";

const usePatchProductMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(PATCH_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PatchProductResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PatchProductDataType> & { variables: { id: string } }
	>({ mutationKey: PATCH_SINGLE_KEY_ARRAY });
};

export default usePatchProductMutation;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { DELETE_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useProducts";
import {
	deleteSingleProduct as mutationFn,
	type DeleteSingleProductDataType,
	type DeleteSingleProductResponseType,
} from "services/api/e-shop/products";

const useDeleteSingleProductMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(DELETE_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<DeleteSingleProductResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<DeleteSingleProductDataType> & { variables: { id: string } }
	>({ mutationKey: DELETE_SINGLE_KEY_ARRAY });
};

export default useDeleteSingleProductMutation;

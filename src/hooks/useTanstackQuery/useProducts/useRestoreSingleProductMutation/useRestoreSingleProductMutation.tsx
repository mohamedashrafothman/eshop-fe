import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { RESTORE_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useProducts";
import {
	restoreSingleProduct as mutationFn,
	type RestoreSingleProductDataType,
	type RestoreSingleProductResponseType,
} from "services/api/e-shop/products";

const useRestoreSingleProductMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(RESTORE_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<RestoreSingleProductResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<RestoreSingleProductDataType> & { variables: { id: string } }
	>({ mutationKey: RESTORE_SINGLE_KEY_ARRAY });
};

export default useRestoreSingleProductMutation;

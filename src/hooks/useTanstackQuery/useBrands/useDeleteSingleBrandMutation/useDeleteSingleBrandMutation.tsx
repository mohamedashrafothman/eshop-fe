import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { DELETE_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useBrands";
import {
	deleteSingleBrand as mutationFn,
	type DeleteSingleBrandDataType,
	type DeleteSingleBrandResponseType,
} from "services/api/e-shop/brands";

const useDeleteSingleBrandMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(DELETE_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<DeleteSingleBrandResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<DeleteSingleBrandDataType> & { variables: { id: string } }
	>({ mutationKey: DELETE_SINGLE_KEY_ARRAY });
};

export default useDeleteSingleBrandMutation;

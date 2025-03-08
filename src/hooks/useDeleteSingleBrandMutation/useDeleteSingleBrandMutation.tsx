import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	deleteSingleBrand as mutationFn,
	type DeleteSingleBrandDataType,
	type DeleteSingleBrandResponseType,
} from "services/api/e-shop/brands";

export const KEY_ARRAY = ["brands", "delete", "brand"];

const useDeleteSingleBrandMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<DeleteSingleBrandResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<DeleteSingleBrandDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default useDeleteSingleBrandMutation;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	deleteSingleCategory as mutationFn,
	type DeleteSingleCategoryDataType,
	type DeleteSingleCategoryResponseType,
} from "services/api/e-shop/categories";

export const KEY_ARRAY = ["categories", "delete", "category"];

const useDeleteSingleCategoryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<DeleteSingleCategoryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<DeleteSingleCategoryDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default useDeleteSingleCategoryMutation;

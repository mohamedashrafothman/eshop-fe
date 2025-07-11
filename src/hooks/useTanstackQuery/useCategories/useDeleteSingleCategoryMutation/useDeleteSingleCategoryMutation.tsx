import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { DELETE_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useCategories";
import {
	deleteSingleCategory as mutationFn,
	type DeleteSingleCategoryDataType,
	type DeleteSingleCategoryResponseType,
} from "services/api/e-shop/categories";

const useDeleteSingleCategoryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(DELETE_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<DeleteSingleCategoryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<DeleteSingleCategoryDataType> & { variables: { id: string } }
	>({ mutationKey: DELETE_SINGLE_KEY_ARRAY });
};

export default useDeleteSingleCategoryMutation;

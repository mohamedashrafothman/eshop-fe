import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	restoreSingleCategory as mutationFn,
	type RestoreSingleCategoryDataType,
	type RestoreSingleCategoryResponseType,
} from "services/api/e-shop/categories";

export const KEY_ARRAY = ["categories", "restore", "category"];

const useRestoreSingleCategoryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<RestoreSingleCategoryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<RestoreSingleCategoryDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default useRestoreSingleCategoryMutation;

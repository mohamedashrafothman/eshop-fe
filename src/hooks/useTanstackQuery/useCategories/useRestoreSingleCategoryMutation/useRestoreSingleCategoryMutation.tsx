import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { RESTORE_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useCategories";
import {
	restoreSingleCategory as mutationFn,
	type RestoreSingleCategoryDataType,
	type RestoreSingleCategoryResponseType,
} from "services/api/e-shop/categories";

const useRestoreSingleCategoryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(RESTORE_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<RestoreSingleCategoryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<RestoreSingleCategoryDataType> & { variables: { id: string } }
	>({ mutationKey: RESTORE_SINGLE_KEY_ARRAY });
};

export default useRestoreSingleCategoryMutation;

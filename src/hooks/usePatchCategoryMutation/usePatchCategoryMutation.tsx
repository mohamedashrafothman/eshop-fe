import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	patchCategory as mutationFn,
	type PatchCategoryDataType,
	type PatchCategoryResponseType,
} from "services/api/e-shop/categories";

export const KEY_ARRAY = ["categories", "patch", "category"];

const usePatchCategoryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PatchCategoryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PatchCategoryDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default usePatchCategoryMutation;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { PATCH_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useCategories";
import {
	patchCategory as mutationFn,
	type PatchCategoryDataType,
	type PatchCategoryResponseType,
} from "services/api/e-shop/categories";

const usePatchCategoryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(PATCH_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PatchCategoryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PatchCategoryDataType> & { variables: { id: string } }
	>({ mutationKey: PATCH_SINGLE_KEY_ARRAY });
};

export default usePatchCategoryMutation;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { PATCH_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useBrands";
import {
	patchBrand as mutationFn,
	type PatchBrandDataType,
	type PatchBrandResponseType,
} from "services/api/e-shop/brands";

const usePatchBrandMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(PATCH_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PatchBrandResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PatchBrandDataType> & { variables: { id: string } }
	>({ mutationKey: PATCH_SINGLE_KEY_ARRAY });
};

export default usePatchBrandMutation;

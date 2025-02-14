import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	patchBrand as mutationFn,
	type PatchBrandDataType,
	type PatchBrandResponseType,
} from "services/api/e-shop/brands";

export const KEY_ARRAY = ["brands", "patch", "brand"];

const usePatchBrandMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PatchBrandResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PatchBrandDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default usePatchBrandMutation;

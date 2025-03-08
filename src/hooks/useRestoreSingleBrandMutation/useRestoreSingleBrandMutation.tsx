import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	restoreSingleBrand as mutationFn,
	type RestoreSingleBrandDataType,
	type RestoreSingleBrandResponseType,
} from "services/api/e-shop/brands";

export const KEY_ARRAY = ["brands", "restore", "brand"];

const useRestoreSingleBrandMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<RestoreSingleBrandResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<RestoreSingleBrandDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default useRestoreSingleBrandMutation;

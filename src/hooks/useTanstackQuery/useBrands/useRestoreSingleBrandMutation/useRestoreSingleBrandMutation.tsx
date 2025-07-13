import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { RESTORE_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useBrands";
import {
	restoreSingleBrand as mutationFn,
	type RestoreSingleBrandDataType,
	type RestoreSingleBrandResponseType,
} from "services/api/e-shop/brands";

const useRestoreSingleBrandMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(RESTORE_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<RestoreSingleBrandResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<RestoreSingleBrandDataType> & { variables: { id: string } }
	>({ mutationKey: RESTORE_SINGLE_KEY_ARRAY });
};

export default useRestoreSingleBrandMutation;

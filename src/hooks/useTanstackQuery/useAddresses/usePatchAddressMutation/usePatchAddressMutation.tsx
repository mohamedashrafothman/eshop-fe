import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { PATCH_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useAddresses";
import {
	patchAddress as mutationFn,
	type PatchAddressDataType,
	type PatchAddressResponseType,
} from "services/api/e-shop/addresses";

const usePatchAddressMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(PATCH_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PatchAddressResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PatchAddressDataType> & { variables: { id: string } }
	>({ mutationKey: PATCH_SINGLE_KEY_ARRAY });
};

export default usePatchAddressMutation;

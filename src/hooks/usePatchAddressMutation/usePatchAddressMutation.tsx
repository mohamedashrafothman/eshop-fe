import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	patchAddress as mutationFn,
	type PatchAddressDataType,
	type PatchAddressResponseType,
} from "services/api/e-shop/addresses";

export const KEY_ARRAY = ["addresses", "patch", "address"];

const usePatchAddressMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PatchAddressResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PatchAddressDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default usePatchAddressMutation;

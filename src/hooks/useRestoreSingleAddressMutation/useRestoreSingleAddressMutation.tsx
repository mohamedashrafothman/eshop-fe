import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	restoreSingleAddress as mutationFn,
	type RestoreSingleAddressDataType,
	type RestoreSingleAddressResponseType,
} from "services/api/e-shop/addresses";

export const KEY_ARRAY = ["addresses", "restore", "address"];

const useRestoreSingleAddressMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<RestoreSingleAddressResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<RestoreSingleAddressDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default useRestoreSingleAddressMutation;

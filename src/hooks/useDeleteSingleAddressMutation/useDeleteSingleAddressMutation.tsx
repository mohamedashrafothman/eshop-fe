import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	deleteSingleAddress as mutationFn,
	type DeleteSingleAddressDataType,
	type DeleteSingleAddressResponseType,
} from "services/api/e-shop/addresses";

export const KEY_ARRAY = ["addresses", "delete", "address"];

const useDeleteSingleAddressMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<DeleteSingleAddressResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<DeleteSingleAddressDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default useDeleteSingleAddressMutation;

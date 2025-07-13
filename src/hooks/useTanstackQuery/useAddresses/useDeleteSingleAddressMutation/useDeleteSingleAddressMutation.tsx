import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { DELETE_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useAddresses";
import {
	deleteSingleAddress as mutationFn,
	type DeleteSingleAddressDataType,
	type DeleteSingleAddressResponseType,
} from "services/api/e-shop/addresses";

const useDeleteSingleAddressMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(DELETE_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<DeleteSingleAddressResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<DeleteSingleAddressDataType> & { variables: { id: string } }
	>({ mutationKey: DELETE_SINGLE_KEY_ARRAY });
};

export default useDeleteSingleAddressMutation;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	deleteSingleState as mutationFn,
	type DeleteSingleStateDataType,
	type DeleteSingleStateResponseType,
} from "services/api/e-shop/states";

export const KEY_ARRAY = ["states", "delete", "state"];

const useDeleteSingleStateMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<DeleteSingleStateResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<DeleteSingleStateDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default useDeleteSingleStateMutation;

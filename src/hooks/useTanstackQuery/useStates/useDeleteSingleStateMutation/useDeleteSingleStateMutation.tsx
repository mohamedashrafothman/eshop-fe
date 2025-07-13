import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { DELETE_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useStates";
import {
	deleteSingleState as mutationFn,
	type DeleteSingleStateDataType,
	type DeleteSingleStateResponseType,
} from "services/api/e-shop/states";

const useDeleteSingleStateMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(DELETE_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<DeleteSingleStateResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<DeleteSingleStateDataType> & { variables: { id: string } }
	>({ mutationKey: DELETE_SINGLE_KEY_ARRAY });
};

export default useDeleteSingleStateMutation;

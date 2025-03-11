import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	restoreSingleState as mutationFn,
	type RestoreSingleStateDataType,
	type RestoreSingleStateResponseType,
} from "services/api/e-shop/states";

export const KEY_ARRAY = ["states", "restore", "state"];

const useRestoreSingleStateMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<RestoreSingleStateResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<RestoreSingleStateDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default useRestoreSingleStateMutation;

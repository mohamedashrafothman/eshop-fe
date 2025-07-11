import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { RESTORE_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useStates";
import {
	restoreSingleState as mutationFn,
	type RestoreSingleStateDataType,
	type RestoreSingleStateResponseType,
} from "services/api/e-shop/states";

const useRestoreSingleStateMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(RESTORE_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<RestoreSingleStateResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<RestoreSingleStateDataType> & { variables: { id: string } }
	>({ mutationKey: RESTORE_SINGLE_KEY_ARRAY });
};

export default useRestoreSingleStateMutation;

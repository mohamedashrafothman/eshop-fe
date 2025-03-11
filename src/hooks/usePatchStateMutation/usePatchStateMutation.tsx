import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	patchState as mutationFn,
	type PatchStateDataType,
	type PatchStateResponseType,
} from "services/api/e-shop/states";

export const KEY_ARRAY = ["states", "patch", "state"];

const usePatchStateMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PatchStateResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PatchStateDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default usePatchStateMutation;

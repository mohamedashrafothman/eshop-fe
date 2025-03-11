import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	postState as mutationFn,
	type PostStateDataType,
	type PostStateResponseType,
} from "services/api/e-shop/states";

export const KEY_ARRAY = ["states", "post", "state"];

const usePostStateMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostStateResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostStateDataType>
	>({ mutationKey: KEY_ARRAY });
};

export default usePostStateMutation;

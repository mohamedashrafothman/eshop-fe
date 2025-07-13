import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { POST_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useStates";
import {
	postState as mutationFn,
	type PostStateDataType,
	type PostStateResponseType,
} from "services/api/e-shop/states";

const usePostStateMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(POST_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostStateResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostStateDataType>
	>({ mutationKey: POST_SINGLE_KEY_ARRAY });
};

export default usePostStateMutation;

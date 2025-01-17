import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestProps,
	type AxiosResponseProps,
} from "config/axios";
import {
	postLogout as mutationFn,
	type PostLogoutDataType,
	type PostLogoutResponseType,
} from "services/api/e-shop/auth";

export const KEY_ARRAY = ["auth", "logout"];

const useLogoutMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostLogoutResponseType>,
		AxiosErrorProps,
		AxiosRequestProps<PostLogoutDataType>
	>({ mutationKey: KEY_ARRAY });
};

export default useLogoutMutation;

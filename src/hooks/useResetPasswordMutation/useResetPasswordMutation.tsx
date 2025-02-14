import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	postResetPassword as mutationFn,
	PostResetPasswordDataType,
	PostResetPasswordResponseType,
} from "services/api/e-shop/auth";

export const KEY_ARRAY = ["auth", "password", "reset"];

const useResetPasswordMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostResetPasswordResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostResetPasswordDataType> & { variables: { token: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default useResetPasswordMutation;

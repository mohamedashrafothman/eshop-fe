import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { RESET_PASSWORD_KEY_ARRAY } from "hooks/useTanstackQuery/useAuth";
import {
	postResetPassword as mutationFn,
	PostResetPasswordDataType,
	PostResetPasswordResponseType,
} from "services/api/e-shop/auth";

const useResetPasswordMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(RESET_PASSWORD_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostResetPasswordResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostResetPasswordDataType> & { variables: { token: string } }
	>({ mutationKey: RESET_PASSWORD_KEY_ARRAY });
};

export default useResetPasswordMutation;

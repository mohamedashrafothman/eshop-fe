import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { FORGOT_PASSWORD_KEY_ARRAY } from "hooks/useTanstackQuery/useAuth";
import {
	postForgotPassword as mutationFn,
	PostForgotPasswordDataType,
	PostForgotPasswordResponseType,
} from "services/api/e-shop/auth";

const useForgotPasswordMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(FORGOT_PASSWORD_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostForgotPasswordResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostForgotPasswordDataType>
	>({ mutationKey: FORGOT_PASSWORD_KEY_ARRAY });
};

export default useForgotPasswordMutation;

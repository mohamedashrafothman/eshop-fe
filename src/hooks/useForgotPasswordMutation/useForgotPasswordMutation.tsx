import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestProps,
	type AxiosResponseProps,
} from "config/axios";
import {
	postForgotPassword as mutationFn,
	PostForgotPasswordDataType,
	PostForgotPasswordResponseType,
} from "services/api/e-shop/auth";

export const KEY_ARRAY = ["auth", "password", "forgot"];

const useForgotPasswordMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostForgotPasswordResponseType>,
		AxiosErrorProps,
		AxiosRequestProps<PostForgotPasswordDataType>
	>({ mutationKey: KEY_ARRAY });
};

export default useForgotPasswordMutation;

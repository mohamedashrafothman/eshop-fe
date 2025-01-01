import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosRequestProps } from "config/axios";
import { postResetPassword as mutationFn } from "services/api/e-shop.com/auth";
import { type schemaType } from "views/forms/ResetPassword/schema";

export const KEY_ARRAY = ["auth", "password", "reset"];

const useResetPasswordMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<AxiosRequestProps<{}>, AxiosErrorProps, AxiosRequestProps<schemaType>>({
		mutationKey: KEY_ARRAY,
	});
};

export default useResetPasswordMutation;

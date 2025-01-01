import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosRequestProps } from "config/axios";
import { postRegister as mutationFn } from "services/api/e-shop.com/auth";
import { type schemaType } from "views/forms/Register/schema";

export const KEY_ARRAY = ["auth", "register"];

const useRegisterMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosRequestProps<schemaType>,
		AxiosErrorProps,
		AxiosRequestProps<schemaType>
	>({ mutationKey: KEY_ARRAY });
};

export default useRegisterMutation;

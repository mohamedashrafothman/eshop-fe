import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestProps,
	type AxiosResponseProps,
} from "config/axios";
import {
	postRegister as mutationFn,
	type PostRegisterDataType,
	type PostRegisterResponseType,
} from "services/api/e-shop.com/auth";

export const KEY_ARRAY = ["auth", "register"];

const useRegisterMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostRegisterResponseType>,
		AxiosErrorProps,
		AxiosRequestProps<PostRegisterDataType>
	>({ mutationKey: KEY_ARRAY });
};

export default useRegisterMutation;

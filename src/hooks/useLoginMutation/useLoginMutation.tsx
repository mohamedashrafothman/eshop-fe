import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestProps,
	type AxiosResponseProps,
} from "config/axios";
import {
	postLogin as mutationFn,
	type PostLoginDataType,
	type PostLoginResponseType,
} from "services/api/e-shop.com/auth";

export const KEY_ARRAY = ["auth", "login"];

const useLoginMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostLoginResponseType>,
		AxiosErrorProps,
		AxiosRequestProps<PostLoginDataType>
	>({ mutationKey: KEY_ARRAY });
};

export default useLoginMutation;

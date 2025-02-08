import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	postUser as mutationFn,
	type PostUserDataType,
	type PostUserResponseType,
} from "services/api/e-shop/users";

export const KEY_ARRAY = ["users", "post", "user"];

const usePostUserMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostUserResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostUserDataType>
	>({ mutationKey: KEY_ARRAY });
};

export default usePostUserMutation;

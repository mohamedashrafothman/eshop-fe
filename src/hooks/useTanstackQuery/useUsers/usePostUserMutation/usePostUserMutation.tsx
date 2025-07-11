import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { POST_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useUsers";
import {
	postUser as mutationFn,
	type PostUserDataType,
	type PostUserResponseType,
} from "services/api/e-shop/users";

const usePostUserMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(POST_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostUserResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostUserDataType>
	>({ mutationKey: POST_SINGLE_KEY_ARRAY });
};

export default usePostUserMutation;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestProps,
	type AxiosResponseProps,
} from "config/axios";
import {
	postRefreshToken as mutationFn,
	type PostRefreshTokenDataType,
	type PostRefreshTokenResponseType,
} from "services/api/e-shop/auth";

export const KEY_ARRAY = ["auth", "refreshToken"];

const useRefreshTokenMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostRefreshTokenResponseType>,
		AxiosErrorProps,
		AxiosRequestProps<PostRefreshTokenDataType>
	>({ mutationKey: KEY_ARRAY });
};

export default useRefreshTokenMutation;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { TOKEN_REFRESH_KEY_ARRAY } from "hooks/useTanstackQuery/useAuth";
import {
	postRefreshToken as mutationFn,
	type PostRefreshTokenDataType,
	type PostRefreshTokenResponseType,
} from "services/api/e-shop/auth";

const useRefreshTokenMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(TOKEN_REFRESH_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostRefreshTokenResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostRefreshTokenDataType>
	>({ mutationKey: TOKEN_REFRESH_KEY_ARRAY });
};

export default useRefreshTokenMutation;

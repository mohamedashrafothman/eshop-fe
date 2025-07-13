import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { LOGOUT_KEY_ARRAY } from "hooks/useTanstackQuery/useAuth";
import {
	postLogout as mutationFn,
	type PostLogoutDataType,
	type PostLogoutResponseType,
} from "services/api/e-shop/auth";

const useLogoutMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(LOGOUT_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostLogoutResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostLogoutDataType>
	>({ mutationKey: LOGOUT_KEY_ARRAY });
};

export default useLogoutMutation;

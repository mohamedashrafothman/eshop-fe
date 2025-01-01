import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosRequestProps } from "config/axios";
import { postLogout as mutationFn } from "services/api/e-shop.com/auth";

export const KEY_ARRAY = ["auth", "login"];

const useLogoutMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<AxiosRequestProps<{}>, AxiosErrorProps, AxiosRequestProps<{}>>({
		mutationKey: KEY_ARRAY,
	});
};

export default useLogoutMutation;

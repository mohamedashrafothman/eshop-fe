import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosRequestProps } from "config/axios";
import { postLogin as mutationFn } from "services/api/e-shop.com/auth";
import { type Session } from "store/session";

export const KEY_ARRAY = ["auth", "refreshToken"];

const useRefreshTokenMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosRequestProps<Omit<Session, "isAuthenticated" | "user">>,
		AxiosErrorProps,
		AxiosRequestProps<{ refreshToken: string }>
	>({ mutationKey: KEY_ARRAY });
};

export default useRefreshTokenMutation;

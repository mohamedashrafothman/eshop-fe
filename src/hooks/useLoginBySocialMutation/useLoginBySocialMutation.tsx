import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosRequestProps } from "config/axios";
import { default as IUser } from "interfaces/User.interface";
import { postLoginBySocialMedia as mutationFn } from "services/api/e-shop.com/auth";
import { type Session } from "store/session";

export const KEY_ARRAY = ["auth", "login", "social"];

const useLoginBySocialMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosRequestProps<Omit<Session, "isAuthenticated" | "user"> & IUser>,
		AxiosErrorProps,
		AxiosRequestProps<{
			name: string;
			email: string;
			providerId: string;
			providerToken: string;
		}>
	>({ mutationKey: KEY_ARRAY });
};

export default useLoginBySocialMutation;

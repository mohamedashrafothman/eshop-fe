import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestProps,
	type AxiosResponseProps,
} from "config/axios";
import {
	postLoginBySocialMedia as mutationFn,
	type PostLoginBySocialMediaDataType,
	type PostLoginBySocialMediaResponseType,
} from "services/api/e-shop.com/auth";

export const KEY_ARRAY = ["auth", "login", "social"];

const useLoginBySocialMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostLoginBySocialMediaResponseType>,
		AxiosErrorProps,
		AxiosRequestProps<PostLoginBySocialMediaDataType>
	>({ mutationKey: KEY_ARRAY });
};

export default useLoginBySocialMutation;

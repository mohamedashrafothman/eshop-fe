import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestProps,
	type AxiosResponseProps,
} from "config/axios";
import {
	patchUser as mutationFn,
	type PatchUserDataType,
	type PatchUserResponseType,
} from "services/api/e-shop/users";

export const KEY_ARRAY = ["users", "patch", "user"];

const usePatchUserMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PatchUserResponseType>,
		AxiosErrorProps,
		AxiosRequestProps<PatchUserDataType>
	>({ mutationKey: KEY_ARRAY });
};

export default usePatchUserMutation;

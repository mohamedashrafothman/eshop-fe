import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { PATCH_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useUsers";
import {
	patchUser as mutationFn,
	type PatchUserDataType,
	type PatchUserResponseType,
} from "services/api/e-shop/users";

const usePatchUserMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(PATCH_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PatchUserResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PatchUserDataType> & { variables: { id: string } }
	>({ mutationKey: PATCH_SINGLE_KEY_ARRAY });
};

export default usePatchUserMutation;

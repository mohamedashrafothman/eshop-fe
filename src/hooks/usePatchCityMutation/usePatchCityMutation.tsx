import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	patchCity as mutationFn,
	type PatchCityDataType,
	type PatchCityResponseType,
} from "services/api/e-shop/cities";

export const KEY_ARRAY = ["cities", "patch", "city"];

const usePatchCityMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PatchCityResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PatchCityDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default usePatchCityMutation;

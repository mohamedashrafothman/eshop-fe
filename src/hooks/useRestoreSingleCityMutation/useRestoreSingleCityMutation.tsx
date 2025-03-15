import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	restoreSingleCity as mutationFn,
	type RestoreSingleCityDataType,
	type RestoreSingleCityResponseType,
} from "services/api/e-shop/cities";

export const KEY_ARRAY = ["cities", "restore", "city"];

const useRestoreSingleCityMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<RestoreSingleCityResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<RestoreSingleCityDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default useRestoreSingleCityMutation;

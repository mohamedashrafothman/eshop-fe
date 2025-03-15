import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	deleteSingleCity as mutationFn,
	type DeleteSingleCityDataType,
	type DeleteSingleCityResponseType,
} from "services/api/e-shop/cities";

export const KEY_ARRAY = ["cities", "delete", "city"];

const useDeleteSingleCityMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<DeleteSingleCityResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<DeleteSingleCityDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default useDeleteSingleCityMutation;

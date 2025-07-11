import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { DELETE_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useCities";
import {
	deleteSingleCity as mutationFn,
	type DeleteSingleCityDataType,
	type DeleteSingleCityResponseType,
} from "services/api/e-shop/cities";

const useDeleteSingleCityMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(DELETE_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<DeleteSingleCityResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<DeleteSingleCityDataType> & { variables: { id: string } }
	>({ mutationKey: DELETE_SINGLE_KEY_ARRAY });
};

export default useDeleteSingleCityMutation;

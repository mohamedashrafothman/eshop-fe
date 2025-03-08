import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	deleteSingleCountry as mutationFn,
	type DeleteSingleCountryDataType,
	type DeleteSingleCountryResponseType,
} from "services/api/e-shop/countries";

export const KEY_ARRAY = ["countries", "delete", "country"];

const useDeleteSingleCountryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<DeleteSingleCountryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<DeleteSingleCountryDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default useDeleteSingleCountryMutation;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { DELETE_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useCountries";
import {
	deleteSingleCountry as mutationFn,
	type DeleteSingleCountryDataType,
	type DeleteSingleCountryResponseType,
} from "services/api/e-shop/countries";

const useDeleteSingleCountryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(DELETE_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<DeleteSingleCountryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<DeleteSingleCountryDataType> & { variables: { id: string } }
	>({ mutationKey: DELETE_SINGLE_KEY_ARRAY });
};

export default useDeleteSingleCountryMutation;

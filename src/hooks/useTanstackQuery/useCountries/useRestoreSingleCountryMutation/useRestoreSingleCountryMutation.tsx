import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { RESTORE_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useCountries";
import {
	restoreSingleCountry as mutationFn,
	type RestoreSingleCountryDataType,
	type RestoreSingleCountryResponseType,
} from "services/api/e-shop/countries";

const useRestoreSingleCountryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(RESTORE_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<RestoreSingleCountryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<RestoreSingleCountryDataType> & { variables: { id: string } }
	>({ mutationKey: RESTORE_SINGLE_KEY_ARRAY });
};

export default useRestoreSingleCountryMutation;

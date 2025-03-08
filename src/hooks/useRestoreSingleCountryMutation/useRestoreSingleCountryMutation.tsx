import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	restoreSingleCountry as mutationFn,
	type RestoreSingleCountryDataType,
	type RestoreSingleCountryResponseType,
} from "services/api/e-shop/countries";

export const KEY_ARRAY = ["countries", "restore", "country"];

const useRestoreSingleCountryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<RestoreSingleCountryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<RestoreSingleCountryDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default useRestoreSingleCountryMutation;

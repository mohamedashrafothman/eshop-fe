import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	patchCountry as mutationFn,
	type PatchCountryDataType,
	type PatchCountryResponseType,
} from "services/api/e-shop/countries";

export const KEY_ARRAY = ["countries", "patch", "country"];

const usePatchCountryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PatchCountryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PatchCountryDataType> & { variables: { id: string } }
	>({ mutationKey: KEY_ARRAY });
};

export default usePatchCountryMutation;

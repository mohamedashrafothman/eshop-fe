import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { PATCH_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useCountries";
import {
	patchCountry as mutationFn,
	type PatchCountryDataType,
	type PatchCountryResponseType,
} from "services/api/e-shop/countries";

const usePatchCountryMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(PATCH_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PatchCountryResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PatchCountryDataType> & { variables: { id: string } }
	>({ mutationKey: PATCH_SINGLE_KEY_ARRAY });
};

export default usePatchCountryMutation;

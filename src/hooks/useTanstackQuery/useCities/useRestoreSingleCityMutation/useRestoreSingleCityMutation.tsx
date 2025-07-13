import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { RESTORE_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useCities";
import {
	restoreSingleCity as mutationFn,
	type RestoreSingleCityDataType,
	type RestoreSingleCityResponseType,
} from "services/api/e-shop/cities";

const useRestoreSingleCityMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(RESTORE_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<RestoreSingleCityResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<RestoreSingleCityDataType> & { variables: { id: string } }
	>({ mutationKey: RESTORE_SINGLE_KEY_ARRAY });
};

export default useRestoreSingleCityMutation;

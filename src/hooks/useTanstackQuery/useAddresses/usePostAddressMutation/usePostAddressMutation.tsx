import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import { POST_SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useAddresses";
import {
	postAddress as mutationFn,
	type PostAddressDataType,
	type PostAddressResponseType,
} from "services/api/e-shop/addresses";

const usePostAddressMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(POST_SINGLE_KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostAddressResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostAddressDataType>
	>({ mutationKey: POST_SINGLE_KEY_ARRAY });
};

export default usePostAddressMutation;

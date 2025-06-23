import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	type AxiosErrorProps,
	type AxiosRequestConfig,
	type AxiosResponseProps,
} from "config/axios";
import {
	postAddress as mutationFn,
	type PostAddressDataType,
	type PostAddressResponseType,
} from "services/api/e-shop/addresses";

export const KEY_ARRAY = ["addresses", "post", "address"];

const usePostAddressMutation = () => {
	const queryClient = useQueryClient();

	queryClient.setMutationDefaults(KEY_ARRAY, { mutationFn });

	return useMutation<
		AxiosResponseProps<PostAddressResponseType>,
		AxiosErrorProps,
		AxiosRequestConfig<PostAddressDataType>
	>({ mutationKey: KEY_ARRAY });
};

export default usePostAddressMutation;

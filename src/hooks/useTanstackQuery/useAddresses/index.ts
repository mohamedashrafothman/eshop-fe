import useAddressesInfinityQuery from "./useAddressesInfinityQuery";
import useAddressesQuery from "./useAddressesQuery";
import useDeleteSingleAddressMutation from "./useDeleteSingleAddressMutation";
import usePatchAddressMutation from "./usePatchAddressMutation";
import usePostAddressMutation from "./usePostAddressMutation";
import useSingleAddressesQuery from "./useSingleAddressesQuery";

export const ALL_KEY_ARRAY = ["addresses"];
export const INFINITY_KEY_ARRAY = [...ALL_KEY_ARRAY, "infinity"];
export const SINGLE_KEY_ARRAY = [...ALL_KEY_ARRAY, "single"];
export const DELETE_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "delete"];
export const PATCH_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "patch"];
export const POST_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "post"];

export {
	useAddressesInfinityQuery,
	useAddressesQuery,
	useDeleteSingleAddressMutation,
	usePatchAddressMutation,
	usePostAddressMutation,
	useSingleAddressesQuery,
};

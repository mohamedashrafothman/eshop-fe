import useDeleteSingleProductMutation from "./useDeleteSingleProductMutation";
import usePatchProductMutation from "./usePatchProductMutation";
import usePostProductMutation from "./usePostProductMutation";
import useProductsInfinityQuery from "./useProductsInfinityQuery";
import useProductsQuery from "./useProductsQuery";
import useRestoreSingleProductMutation from "./useRestoreSingleProductMutation";
import useSingleProductsQuery from "./useSingleProductsQuery";

export const ALL_KEY_ARRAY = ["products"];
export const INFINITY_KEY_ARRAY = [...ALL_KEY_ARRAY, "infinity"];
export const SINGLE_KEY_ARRAY = [...ALL_KEY_ARRAY, "single"];
export const DELETE_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "delete"];
export const RESTORE_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "restore"];
export const PATCH_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "patch"];
export const POST_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "post"];

export {
	useDeleteSingleProductMutation,
	usePatchProductMutation,
	usePostProductMutation,
	useProductsInfinityQuery,
	useProductsQuery,
	useRestoreSingleProductMutation,
	useSingleProductsQuery,
};

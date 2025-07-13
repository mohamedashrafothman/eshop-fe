import useCategoriesInfinityQuery from "./useCategoriesInfinityQuery";
import useCategoriesQuery from "./useCategoriesQuery";
import useDeleteSingleCategoryMutation from "./useDeleteSingleCategoryMutation";
import usePatchCategoryMutation from "./usePatchCategoryMutation";
import usePostCategoryMutation from "./usePostCategoryMutation";
import useRestoreSingleCategoryMutation from "./useRestoreSingleCategoryMutation";
import useSingleCategoriesQuery from "./useSingleCategoriesQuery";

export const ALL_KEY_ARRAY = ["categories"];
export const INFINITY_KEY_ARRAY = [...ALL_KEY_ARRAY, "infinity"];
export const SINGLE_KEY_ARRAY = [...ALL_KEY_ARRAY, "single"];
export const DELETE_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "delete"];
export const RESTORE_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "restore"];
export const PATCH_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "patch"];
export const POST_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "post"];

export {
	useCategoriesInfinityQuery,
	useCategoriesQuery,
	useDeleteSingleCategoryMutation,
	usePatchCategoryMutation,
	usePostCategoryMutation,
	useRestoreSingleCategoryMutation,
	useSingleCategoriesQuery,
};

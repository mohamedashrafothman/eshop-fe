import useCitiesInfinityQuery from "./useCitiesInfinityQuery";
import useCitiesQuery from "./useCitiesQuery";
import useDeleteSingleCityMutation from "./useDeleteSingleCityMutation";
import usePatchCityMutation from "./usePatchCityMutation";
import usePostCityMutation from "./usePostCityMutation";
import useRestoreSingleCityMutation from "./useRestoreSingleCityMutation";
import useSingleCitiesQuery from "./useSingleCitiesQuery";

export const ALL_KEY_ARRAY = ["cities"];
export const INFINITY_KEY_ARRAY = [...ALL_KEY_ARRAY, "infinity"];
export const SINGLE_KEY_ARRAY = [...ALL_KEY_ARRAY, "single"];
export const DELETE_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "delete"];
export const RESTORE_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "restore"];
export const PATCH_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "patch"];
export const POST_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "post"];

export {
	useCitiesInfinityQuery,
	useCitiesQuery,
	useDeleteSingleCityMutation,
	usePatchCityMutation,
	usePostCityMutation,
	useRestoreSingleCityMutation,
	useSingleCitiesQuery,
};

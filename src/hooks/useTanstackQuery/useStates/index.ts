import useDeleteSingleStateMutation from "./useDeleteSingleStateMutation";
import usePatchStateMutation from "./usePatchStateMutation";
import usePostStateMutation from "./usePostStateMutation";
import useRestoreSingleStateMutation from "./useRestoreSingleStateMutation";
import useSingleStatesQuery from "./useSingleStatesQuery";
import useStatesInfinityQuery from "./useStatesInfinityQuery";
import useStatesQuery from "./useStatesQuery";

export const ALL_KEY_ARRAY = ["states"];
export const INFINITY_KEY_ARRAY = [...ALL_KEY_ARRAY, "infinity"];
export const SINGLE_KEY_ARRAY = [...ALL_KEY_ARRAY, "single"];
export const DELETE_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "delete"];
export const RESTORE_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "restore"];
export const PATCH_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "patch"];
export const POST_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "post"];

export {
	useDeleteSingleStateMutation,
	usePatchStateMutation,
	usePostStateMutation,
	useRestoreSingleStateMutation,
	useSingleStatesQuery,
	useStatesInfinityQuery,
	useStatesQuery,
};

import useCountriesInfinityQuery from "./useCountriesInfinityQuery";
import useCountriesQuery from "./useCountriesQuery";
import useDeleteSingleCountryMutation from "./useDeleteSingleCountryMutation";
import usePatchCountryMutation from "./usePatchCountryMutation";
import usePostCountryMutation from "./usePostCountryMutation";
import useRestoreSingleCountryMutation from "./useRestoreSingleCountryMutation";
import useSingleCountriesQuery from "./useSingleCountriesQuery";

export const ALL_KEY_ARRAY = ["countries"];
export const INFINITY_KEY_ARRAY = [...ALL_KEY_ARRAY, "infinity"];
export const SINGLE_KEY_ARRAY = [...ALL_KEY_ARRAY, "single"];
export const DELETE_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "delete"];
export const RESTORE_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "restore"];
export const PATCH_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "patch"];
export const POST_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "post"];

export {
	useCountriesInfinityQuery,
	useCountriesQuery,
	useDeleteSingleCountryMutation,
	usePatchCountryMutation,
	usePostCountryMutation,
	useRestoreSingleCountryMutation,
	useSingleCountriesQuery,
};

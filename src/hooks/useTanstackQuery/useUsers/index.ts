import useMeQuery from "./useMeQuery";
import usePatchUserMutation from "./usePatchUserMutation";
import usePostUserMutation from "./usePostUserMutation";
import useSingleUsersQuery from "./useSingleUsersQuery";
import useUserEmailResendQuery from "./useUserEmailResendQuery";
import useUserEmailVerifyQuery from "./useUserEmailVerifyQuery";
import useUsersInfinityQuery from "./useUsersInfinityQuery";

export const ALL_KEY_ARRAY = ["users"];
export const INFINITY_KEY_ARRAY = [...ALL_KEY_ARRAY, "infinity"];
export const ME_KEY_ARRAY = [...ALL_KEY_ARRAY, "me"];
export const SINGLE_KEY_ARRAY = [...ALL_KEY_ARRAY, "single"];
export const PATCH_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "patch"];
export const POST_SINGLE_KEY_ARRAY = [...SINGLE_KEY_ARRAY, "post"];
export const EMAIL_KEY_ARRAY = [...ALL_KEY_ARRAY, "email"];
export const VERIFY_EMAIL_KEY_ARRAY = [...ALL_KEY_ARRAY, "email", "verify"];
export const RESEND_VERIFY_EMAIL_KEY_ARRAY = [...VERIFY_EMAIL_KEY_ARRAY, "resend"];

export {
	useMeQuery,
	usePatchUserMutation,
	usePostUserMutation,
	useSingleUsersQuery,
	useUserEmailResendQuery,
	useUserEmailVerifyQuery,
	useUsersInfinityQuery,
};

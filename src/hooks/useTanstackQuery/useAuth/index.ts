import useMeQuery from "../useUsers/useMeQuery";
import useForgotPasswordMutation from "./useForgotPasswordMutation";
import useLoginBySocialMutation from "./useLoginBySocialMutation";
import useLoginMutation from "./useLoginMutation";
import useLogoutMutation from "./useLogoutMutation";
import useRefreshTokenMutation from "./useRefreshTokenMutation";
import useRegisterMutation from "./useRegisterMutation";
import useResetPasswordMutation from "./useResetPasswordMutation";
import useUnlinkSocialMutation from "./useUnlinkSocialMutation";

export const KEY_ARRAY = ["auth"];
export const PASSWORD_KEY_ARRAY = [...KEY_ARRAY, "password"];
export const FORGOT_PASSWORD_KEY_ARRAY = [...PASSWORD_KEY_ARRAY, "forgot"];
export const RESET_PASSWORD_KEY_ARRAY = [...PASSWORD_KEY_ARRAY, "reset"];
export const LOGIN_KEY_ARRAY = [...KEY_ARRAY, "login"];
export const LOGIN_SOCIAL_KEY_ARRAY = [...LOGIN_KEY_ARRAY, "social"];
export const UNLINK_LOGIN_SOCIAL_KEY_ARRAY = [...LOGIN_KEY_ARRAY, "social", "unlink"];
export const LOGOUT_KEY_ARRAY = [...KEY_ARRAY, "logout"];
export const TOKEN_KEY_ARRAY = [...KEY_ARRAY, "token"];
export const TOKEN_REFRESH_KEY_ARRAY = [...TOKEN_KEY_ARRAY, "refresh"];
export const REGISTER_KEY_ARRAY = [...KEY_ARRAY, "register"];

export {
	useForgotPasswordMutation,
	useLoginBySocialMutation,
	useLoginMutation,
	useLogoutMutation,
	useMeQuery,
	useRefreshTokenMutation,
	useRegisterMutation,
	useResetPasswordMutation,
	useUnlinkSocialMutation,
};

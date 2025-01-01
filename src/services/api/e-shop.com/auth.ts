import { axiosRequest } from "config/axios";

// constants
export const REGISTER_URL = "/v1/auth/register";
export const LOGIN_URL = "/v1/auth/login";
export const LOGOUT_URL = "/v1/auth/logout";
export const REFRESH_TOKEN_URL = "/v1/auth/refresh-token";
export const SOCIAL_LOGIN_URL = "/v1/auth/:provider";
export const SOCIAL_UNLINK_URL = "/v1/auth/:provider/unlink";
export const PASSWORD_FORGOT_URL = "/v1/auth/password/forgot";
export const PASSWORD_RESET_URL = "/v1/auth/password/reset";

// requests methods
export const postRegister = ({ ...options }) =>
	axiosRequest({ ...options, method: "post", url: REGISTER_URL });

export const postLogin = ({ ...options }) =>
	axiosRequest({ ...options, method: "post", url: LOGIN_URL });

export const postLogout = ({ ...options }) =>
	axiosRequest({ ...options, method: "post", url: LOGOUT_URL });

export const postRefreshToken = ({ ...options }) =>
	axiosRequest({ ...options, method: "post", url: REFRESH_TOKEN_URL });

export const postLoginBySocialMedia = ({ ...options }) =>
	axiosRequest({ ...options, method: "post", url: SOCIAL_LOGIN_URL });

export const postUnlinkSocialMedia = ({ ...options }) =>
	axiosRequest({ ...options, url: SOCIAL_UNLINK_URL });

export const postForgotPassword = ({ ...options }) =>
	axiosRequest({ ...options, method: "post", url: PASSWORD_FORGOT_URL });

export const postResetPassword = ({ ...options }) =>
	axiosRequest({ ...options, method: "post", url: PASSWORD_RESET_URL });

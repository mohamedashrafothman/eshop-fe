import { axiosRequest } from "config/axios";

// constants
export const REGISTER_URL = "/auth/register";
export const LOGIN_URL = "/auth/login";
export const LOGOUT_URL = "/auth/logout";
export const REFRESH_TOKEN_URL = "/auth/refresh-token";
export const SOCIAL_LOGIN_URL = "/auth/:provider";
export const SOCIAL_UNLINK_URL = "/auth/:provider/unlink";
export const FORGOT_PASSWORD_URL = "/auth/password/forgot";
export const RESET_PASSWORD_URL = "/auth/password/reset";

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
	axiosRequest({ ...options, method: "post", url: FORGOT_PASSWORD_URL });

export const postResetPassword = ({ ...options }) =>
	axiosRequest({ ...options, method: "post", url: RESET_PASSWORD_URL });

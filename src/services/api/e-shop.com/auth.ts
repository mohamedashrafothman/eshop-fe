import axiosInstance, { type AxiosRequestProps } from "config/axios";
import IUser from "interfaces/User.interface";
import vars from "utils/vars";

// auth request and response types
export type TokensType = { accessToken: string; refreshToken: string; tokenType: string };
export type OAuthProviderNamesType = keyof typeof vars.secrets.OAuth;
export type PostRegisterDataType = {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
	"g-recaptcha-response": string;
};
export type PostRegisterResponseType = TokensType & IUser;
export type PostLoginDataType = {
	remember?: boolean | undefined;
	email: string;
	password: string;
};
export type PostLoginResponseType = TokensType & IUser;
export type PostLogoutDataType = {};
export type PostLogoutResponseType = {};
export type PostRefreshTokenDataType = Pick<TokensType, "refreshToken">;
export type PostRefreshTokenResponseType = TokensType;
export type PostLoginBySocialMediaDataType = {
	email: string;
	name: string;
	providerToken: string;
	providerId: string;
};
export type PostLoginBySocialMediaResponseType = TokensType & IUser;
export type PostUnlinkSocialMediaDataType = {};
export type PostUnlinkSocialMediaResponseType = {};
export type PostForgotPasswordDataType = { email: string };
export type PostForgotPasswordResponseType = {};
export type PostResetPasswordDataType = { password: string; passwordConfirmation: string };
export type PostResetPasswordResponseType = {};

// requests methods
export const postRegister = ({ ...options }: AxiosRequestProps<PostRegisterDataType>) =>
	axiosInstance<PostRegisterResponseType, PostRegisterDataType>({
		...options,
		method: "post",
		url: "/v1/auth/register",
	});

export const postLogin = ({ ...options }: AxiosRequestProps<PostLoginDataType>) =>
	axiosInstance<PostLoginResponseType, PostLoginDataType>({
		...options,
		method: "post",
		url: "/v1/auth/login",
	});

export const postLogout = ({ ...options }: AxiosRequestProps<PostLogoutDataType>) =>
	axiosInstance<PostLogoutResponseType, PostLogoutDataType>({
		...options,
		method: "post",
		url: "/v1/auth/logout",
	});

export const postRefreshToken = ({ ...options }: AxiosRequestProps<PostRefreshTokenDataType>) =>
	axiosInstance<PostRefreshTokenResponseType, PostRefreshTokenDataType>({
		...options,
		method: "post",
		url: "/v1/auth/refresh-token",
	});

export const postLoginBySocialMedia = ({
	variables,
	...options
}: AxiosRequestProps<PostLoginBySocialMediaDataType, { providerName: OAuthProviderNamesType }>) =>
	axiosInstance<PostLoginBySocialMediaResponseType, PostLoginBySocialMediaDataType>({
		...options,
		method: "post",
		url: `/v1/auth/${variables?.providerName}`,
	});

export const postUnlinkSocialMedia = ({
	variables,
	...options
}: AxiosRequestProps<PostUnlinkSocialMediaDataType, { providerName: OAuthProviderNamesType }>) =>
	axiosInstance<PostUnlinkSocialMediaResponseType, PostUnlinkSocialMediaDataType>({
		...options,
		url: `/v1/auth/${variables?.providerName}/unlink`,
	});

export const postForgotPassword = ({ ...options }: AxiosRequestProps<PostForgotPasswordDataType>) =>
	axiosInstance<PostForgotPasswordResponseType, PostForgotPasswordDataType>({
		...options,
		method: "post",
		url: "/v1/auth/password/forgot",
	});

export const postResetPassword = ({
	variables,
	...options
}: AxiosRequestProps<PostResetPasswordDataType, { token: string }>) =>
	axiosInstance<PostResetPasswordResponseType, PostResetPasswordDataType>({
		...options,
		method: "post",
		url: `/v1/auth/password/reset/${variables?.token}`,
	});

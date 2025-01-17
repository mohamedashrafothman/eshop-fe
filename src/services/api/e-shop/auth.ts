import { axiosRequest, type AxiosRequestProps } from "config/axios";
import IUser from "interfaces/User.interface";
import vars from "utils/vars";

// request and response types
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
export type PostLogoutDataType = object;
export type PostLogoutResponseType = object;
export type PostRefreshTokenDataType = Pick<TokensType, "refreshToken">;
export type PostRefreshTokenResponseType = TokensType;
export type PostLoginBySocialMediaDataType = {
	email: string;
	name: string;
	providerToken: string;
	providerId: string;
};
export type PostLoginBySocialMediaResponseType = TokensType & IUser;
export type PostUnlinkSocialMediaDataType = object;
export type PostUnlinkSocialMediaResponseType = object;
export type PostForgotPasswordDataType = { email: string };
export type PostForgotPasswordResponseType = object;
export type PostResetPasswordDataType = { password: string; passwordConfirmation: string };
export type PostResetPasswordResponseType = object;

// requests methods
export const postRegister = ({ ...options }: AxiosRequestProps<PostRegisterDataType>) =>
	axiosRequest<PostRegisterDataType, PostRegisterResponseType>({
		...options,
		method: "post",
		url: "/v1/auth/register",
	});

export const postLogin = ({ ...options }: AxiosRequestProps<PostLoginDataType>) =>
	axiosRequest<PostLoginDataType, PostLoginResponseType>({
		...options,
		method: "post",
		url: "/v1/auth/login",
	});

export const postLogout = ({ ...options }: AxiosRequestProps<PostLogoutDataType>) =>
	axiosRequest<PostLogoutDataType, PostLogoutResponseType>({
		...options,
		method: "post",
		url: "/v1/auth/logout",
	});

export const postRefreshToken = ({ ...options }: AxiosRequestProps<PostRefreshTokenDataType>) =>
	axiosRequest<PostRefreshTokenDataType, PostRefreshTokenResponseType>({
		...options,
		method: "post",
		url: "/v1/auth/refresh-token",
	});

export const postLoginBySocialMedia = ({
	variables,
	...options
}: AxiosRequestProps<PostLoginBySocialMediaDataType, { providerName: OAuthProviderNamesType }>) =>
	axiosRequest<PostLoginBySocialMediaDataType, PostLoginBySocialMediaResponseType>({
		...options,
		method: "post",
		url: `/v1/auth/${variables?.providerName}`,
	});

export const postUnlinkSocialMedia = ({
	variables,
	...options
}: AxiosRequestProps<PostUnlinkSocialMediaDataType, { providerName: OAuthProviderNamesType }>) =>
	axiosRequest<PostUnlinkSocialMediaDataType, PostUnlinkSocialMediaResponseType>({
		...options,
		method: "post",
		url: `/v1/auth/${variables?.providerName}/unlink`,
	});

export const postForgotPassword = ({ ...options }: AxiosRequestProps<PostForgotPasswordDataType>) =>
	axiosRequest<PostForgotPasswordDataType, PostForgotPasswordResponseType>({
		...options,
		method: "post",
		url: "/v1/auth/password/forgot",
	});

export const postResetPassword = ({
	variables,
	...options
}: AxiosRequestProps<PostResetPasswordDataType, { token: string }>) =>
	axiosRequest<PostResetPasswordDataType, PostResetPasswordResponseType>({
		...options,
		method: "post",
		url: `/v1/auth/password/reset/${variables?.token}`,
	});

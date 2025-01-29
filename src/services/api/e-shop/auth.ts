import axiosInstance, { type AxiosRequestConfig, type AxiosResponseProps } from "config/axios";
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
export type PostUnlinkSocialMediaResponseType = IUser;
export type PostForgotPasswordDataType = { email: string };
export type PostForgotPasswordResponseType = object;
export type PostResetPasswordDataType = { password: string; passwordConfirmation: string };
export type PostResetPasswordResponseType = object;

// requests methods
export const postRegister = ({ ...options }: AxiosRequestConfig<PostRegisterDataType>) =>
	axiosInstance<PostRegisterResponseType, AxiosResponseProps<PostRegisterResponseType>>({
		method: "post",
		url: "/v1/auth/register",
		...options,
	});

export const postLogin = ({ ...options }: AxiosRequestConfig<PostLoginDataType>) =>
	axiosInstance<PostLoginResponseType, AxiosResponseProps<PostLoginResponseType>>({
		method: "post",
		url: "/v1/auth/login",
		...options,
	});

export const postLogout = ({ ...options }: AxiosRequestConfig<PostLogoutDataType>) =>
	axiosInstance<PostLogoutResponseType, AxiosResponseProps<PostLogoutResponseType>>({
		method: "post",
		url: "/v1/auth/logout",
		...options,
	});

export const postRefreshToken = ({ ...options }: AxiosRequestConfig<PostRefreshTokenDataType>) =>
	axiosInstance<PostRefreshTokenResponseType, AxiosResponseProps<PostRefreshTokenResponseType>>({
		method: "post",
		url: "/v1/auth/refresh-token",
		...options,
	});

export const postLoginBySocialMedia = ({
	variables,
	...options
}: AxiosRequestConfig<PostLoginBySocialMediaDataType> & {
	variables: { providerName: OAuthProviderNamesType };
}) =>
	axiosInstance<
		PostLoginBySocialMediaResponseType,
		AxiosResponseProps<PostLoginBySocialMediaResponseType>
	>({
		method: "post",
		url: `/v1/auth/${variables.providerName}`,
		...options,
	});

export const postUnlinkSocialMedia = ({
	variables,
	...options
}: AxiosRequestConfig<PostUnlinkSocialMediaDataType> & {
	variables: { providerName: OAuthProviderNamesType };
}) =>
	axiosInstance<
		PostUnlinkSocialMediaResponseType,
		AxiosResponseProps<PostUnlinkSocialMediaResponseType>
	>({
		method: "post",
		url: `/v1/auth/${variables.providerName}/unlink`,
		...options,
	});

export const postForgotPassword = ({
	...options
}: AxiosRequestConfig<PostForgotPasswordDataType>) =>
	axiosInstance<
		PostForgotPasswordResponseType,
		AxiosResponseProps<PostForgotPasswordResponseType>
	>({
		method: "post",
		url: "/v1/auth/password/forgot",
		...options,
	});

export const postResetPassword = ({
	variables,
	...options
}: AxiosRequestConfig<PostResetPasswordDataType> & { variables: { token: string } }) =>
	axiosInstance<PostResetPasswordResponseType, AxiosResponseProps<PostResetPasswordResponseType>>(
		{
			method: "post",
			url: `/v1/auth/password/reset/${variables.token}`,
			...options,
		}
	);

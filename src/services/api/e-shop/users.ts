import axiosInstance, { type AxiosRequestConfig, type AxiosResponseProps } from "config/axios";
import IUser from "interfaces/User.interface";

// request and response types
export type GetMeResponseType = IUser;
export type GetMeDataType = object;
export type PostUserDataType = Pick<IUser, "name" | "email" | "role">;
export type PostUserResponseType = IUser;
export type PatchUserDataType =
	| Partial<IUser>
	| { oldPassword: string; password: string; passwordConfirmation: string };
export type PatchUserResponseType = IUser;
export type GetUsersDataType = {
	page?: number | undefined;
	limit?: number | undefined;
	sort?: string | undefined;
	offset?: number | undefined;
	pagination?: boolean | undefined;
	q?: string | undefined;
	deleted?: boolean | number | undefined;
	emailVerified?: boolean | number | undefined;
	active?: boolean | number | undefined;
};
export type GetUsersResponseType = IUser[];
export type GetSingleUserDataType = object;
export type GetSingleUserResponseType = IUser;
export type GetUserEmailResendDataType = object;
export type GetUserEmailResendResponseType = object;
export type GetUserEmailVerifyDataType = object;
export type GetUserEmailVerifyResponseType = object;

// requests methods
export const getMe = ({ ...options }: AxiosRequestConfig<GetMeDataType>) =>
	axiosInstance<GetMeResponseType, AxiosResponseProps<GetMeResponseType>>({
		url: "/v1/users/me",
		...options,
	});

export const postUser = ({ ...options }: AxiosRequestConfig<PostUserDataType>) =>
	axiosInstance<PostUserResponseType, AxiosResponseProps<PostUserResponseType>>({
		method: "post",
		url: "/v1/users",
		...options,
	});

export const patchUser = ({
	variables,
	...options
}: AxiosRequestConfig<PatchUserDataType> & { variables: { id: string } }) =>
	axiosInstance<PatchUserResponseType, AxiosResponseProps<PatchUserResponseType>>({
		method: "patch",
		url: `/v1/users/${variables?.id}`,
		...options,
	});

export const getUsers = ({ ...options }: AxiosRequestConfig<GetUsersDataType>) =>
	axiosInstance<GetUsersResponseType, AxiosResponseProps<GetUsersResponseType>>({
		url: "/v1/users",
		...options,
	});

export const getSingleUser = ({
	variables,
	...options
}: AxiosRequestConfig<GetSingleUserDataType> & { variables: { id: string } }) =>
	axiosInstance<GetSingleUserResponseType, AxiosResponseProps<GetSingleUserResponseType>>({
		url: `/v1/users/${variables?.id}`,
		...options,
	});

export const getUserEmailResend = ({
	variables,
	...options
}: AxiosRequestConfig<GetUserEmailResendDataType> & { variables: { id: string } }) =>
	axiosInstance<
		GetUserEmailResendResponseType,
		AxiosResponseProps<GetUserEmailResendResponseType>
	>({ url: `/v1/users/${variables?.id}/email/resend`, ...options });

export const getUserEmailVerify = ({
	variables,
	...options
}: AxiosRequestConfig<GetUserEmailVerifyDataType> & { variables: { id: string; token: string } }) =>
	axiosInstance<
		GetUserEmailVerifyResponseType,
		AxiosResponseProps<GetUserEmailVerifyResponseType>
	>({ url: `/v1/users/${variables?.id}/email/verify/${variables?.token}`, ...options });

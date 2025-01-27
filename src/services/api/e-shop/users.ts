import axiosInstance, { type AxiosRequestConfig, type AxiosResponseProps } from "config/axios";
import IUser from "interfaces/User.interface";

// request and response types
export type GetMeResponseType = IUser;
export type GetMeDataType = object;
export type PatchUserDataType =
	| Partial<IUser>
	| { oldPassword: string; password: string; passwordConfirmation: string };
export type PatchUserResponseType = IUser;

// requests methods
export const getMe = ({ ...options }: AxiosRequestConfig<GetMeDataType>) =>
	axiosInstance<GetMeResponseType, AxiosResponseProps<GetMeResponseType>>({
		method: "get",
		url: "/v1/users/me",
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

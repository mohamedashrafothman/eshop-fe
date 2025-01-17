import { axiosRequest, type AxiosRequestProps } from "config/axios";
import IUser from "interfaces/User.interface";

// request and response types
export type GetMeResponseType = IUser;
export type GetMeDataType = object;
export type PatchUserDataType =
	| Partial<IUser>
	| { oldPassword: string; password: string; passwordConfirmation: string };
export type PatchUserResponseType = IUser;

// requests methods
export const getMe = ({ ...options }: AxiosRequestProps<GetMeDataType>) =>
	axiosRequest<GetMeDataType, GetMeResponseType>({ ...options, url: "/v1/users/me" });

export const patchUser = ({
	variables,
	...options
}: AxiosRequestProps<PatchUserDataType, { id: string }>) =>
	axiosRequest<PatchUserDataType, PatchUserResponseType>({
		...options,
		method: "patch",
		url: `/v1/users/${variables?.id}`,
	});

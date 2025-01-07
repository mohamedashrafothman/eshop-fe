import { axiosRequest, type AxiosRequestProps } from "config/axios";
import IUser from "interfaces/User.interface";

// request and response types
export type GetMeResponseType = IUser;
export type GetMeDataType = object;

// requests methods
export const getMe = ({ ...options }: AxiosRequestProps<GetMeDataType>) =>
	axiosRequest<GetMeDataType, GetMeResponseType>({ ...options, url: "/v1/users/me" });

import axiosInstance, { type AxiosRequestConfig, type AxiosResponseProps } from "config/axios";
import IState from "interfaces/State.interface";

// request and response types
export type PostStateDataType = object;
export type PostStateResponseType = IState;
export type PatchStateDataType = object;
export type PatchStateResponseType = IState;
export type GetStatesDataType = {
	page?: number | undefined;
	limit?: number | undefined;
	sort?: string | undefined;
	offset?: number | undefined;
	pagination?: boolean | undefined;
	q?: string | undefined;
	deleted?: boolean | number | undefined;
	country?: string | undefined;
};
export type GetStatesResponseType = IState[];
export type GetSingleStateDataType = object;
export type GetSingleStateResponseType = IState;
export type DeleteSingleStateDataType = object;
export type DeleteSingleStateResponseType = object;
export type RestoreSingleStateDataType = object;
export type RestoreSingleStateResponseType = object;

export const postState = ({ ...options }: AxiosRequestConfig<PostStateDataType>) =>
	axiosInstance<PostStateResponseType, AxiosResponseProps<PostStateResponseType>>({
		method: "post",
		url: "/v1/states",
		...options,
	});

export const patchState = ({
	variables,
	...options
}: AxiosRequestConfig<PatchStateDataType> & { variables: { id: string } }) =>
	axiosInstance<PatchStateResponseType, AxiosResponseProps<PatchStateResponseType>>({
		method: "patch",
		url: `/v1/states/${variables?.id}`,
		...options,
	});

export const getStates = ({ ...options }: AxiosRequestConfig<GetStatesDataType>) =>
	axiosInstance<GetStatesResponseType, AxiosResponseProps<GetStatesResponseType>>({
		url: "/v1/states",
		...options,
	});

export const getSingleState = ({
	variables,
	...options
}: AxiosRequestConfig<GetSingleStateDataType> & { variables: { id: string } }) =>
	axiosInstance<GetSingleStateResponseType, AxiosResponseProps<GetSingleStateResponseType>>({
		url: `/v1/states/${variables?.id}`,
		...options,
	});

export const deleteSingleState = ({
	variables,
	...options
}: AxiosRequestConfig<DeleteSingleStateDataType> & { variables: { id: string } }) =>
	axiosInstance<DeleteSingleStateResponseType, AxiosResponseProps<DeleteSingleStateResponseType>>(
		{
			method: "delete",
			url: `/v1/states/${variables?.id}`,
			...options,
		}
	);

export const restoreSingleState = ({
	variables,
	...options
}: AxiosRequestConfig<RestoreSingleStateDataType> & { variables: { id: string } }) =>
	axiosInstance<
		RestoreSingleStateResponseType,
		AxiosResponseProps<RestoreSingleStateResponseType>
	>({
		method: "patch",
		url: `/v1/states/${variables?.id}/restore`,
		...options,
	});

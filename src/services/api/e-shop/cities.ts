import axiosInstance, { type AxiosRequestConfig, type AxiosResponseProps } from "config/axios";
import ICity from "interfaces/City.interface";

// request and response types
export type PostCityDataType = object;
export type PostCityResponseType = ICity;
export type PatchCityDataType = object;
export type PatchCityResponseType = ICity;
export type GetCitiesDataType = {
	page?: number | undefined;
	limit?: number | undefined;
	sort?: string | undefined;
	offset?: number | undefined;
	pagination?: boolean | undefined;
	q?: string | undefined;
	deleted?: boolean | number | undefined;
	country?: string | undefined;
	state?: string | undefined;
};
export type GetCitiesResponseType = ICity[];
export type GetSingleCityDataType = object;
export type GetSingleCityResponseType = ICity;
export type DeleteSingleCityDataType = object;
export type DeleteSingleCityResponseType = object;
export type RestoreSingleCityDataType = object;
export type RestoreSingleCityResponseType = object;

export const postCity = ({ ...options }: AxiosRequestConfig<PostCityDataType>) =>
	axiosInstance<PostCityResponseType, AxiosResponseProps<PostCityResponseType>>({
		method: "post",
		url: "/v1/cities",
		...options,
	});

export const patchCity = ({
	variables,
	...options
}: AxiosRequestConfig<PatchCityDataType> & { variables: { id: string } }) =>
	axiosInstance<PatchCityResponseType, AxiosResponseProps<PatchCityResponseType>>({
		method: "patch",
		url: `/v1/cities/${variables?.id}`,
		...options,
	});

export const getCities = ({ ...options }: AxiosRequestConfig<GetCitiesDataType>) =>
	axiosInstance<GetCitiesResponseType, AxiosResponseProps<GetCitiesResponseType>>({
		url: "/v1/cities",
		...options,
	});

export const getSingleCity = ({
	variables,
	...options
}: AxiosRequestConfig<GetSingleCityDataType> & { variables: { id: string } }) =>
	axiosInstance<GetSingleCityResponseType, AxiosResponseProps<GetSingleCityResponseType>>({
		url: `/v1/cities/${variables?.id}`,
		...options,
	});

export const deleteSingleCity = ({
	variables,
	...options
}: AxiosRequestConfig<DeleteSingleCityDataType> & { variables: { id: string } }) =>
	axiosInstance<DeleteSingleCityResponseType, AxiosResponseProps<DeleteSingleCityResponseType>>({
		method: "delete",
		url: `/v1/cities/${variables?.id}`,
		...options,
	});

export const restoreSingleCity = ({
	variables,
	...options
}: AxiosRequestConfig<RestoreSingleCityDataType> & { variables: { id: string } }) =>
	axiosInstance<RestoreSingleCityResponseType, AxiosResponseProps<RestoreSingleCityResponseType>>(
		{
			method: "patch",
			url: `/v1/cities/${variables?.id}/restore`,
			...options,
		}
	);

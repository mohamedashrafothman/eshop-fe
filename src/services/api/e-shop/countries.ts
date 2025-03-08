import axiosInstance, { type AxiosRequestConfig, type AxiosResponseProps } from "config/axios";
import ICountry from "interfaces/Country.interface";

// request and response types
export type PostCountryDataType = object;
export type PostCountryResponseType = ICountry;
export type PatchCountryDataType = object;
export type PatchCountryResponseType = ICountry;
export type GetCountriesDataType = {
	page?: number | undefined;
	limit?: number | undefined;
	sort?: string | undefined;
	offset?: number | undefined;
	pagination?: boolean | undefined;
	q?: string | undefined;
	deleted?: boolean | number | undefined;
};
export type GetCountriesResponseType = ICountry[];
export type GetSingleCountryDataType = object;
export type GetSingleCountryResponseType = ICountry;
export type DeleteSingleCountryDataType = object;
export type DeleteSingleCountryResponseType = object;
export type RestoreSingleCountryDataType = object;
export type RestoreSingleCountryResponseType = object;

export const postCountry = ({ ...options }: AxiosRequestConfig<PostCountryDataType>) =>
	axiosInstance<PostCountryResponseType, AxiosResponseProps<PostCountryResponseType>>({
		method: "post",
		url: "/v1/countries",
		...options,
	});

export const patchCountry = ({
	variables,
	...options
}: AxiosRequestConfig<PatchCountryDataType> & { variables: { id: string } }) =>
	axiosInstance<PatchCountryResponseType, AxiosResponseProps<PatchCountryResponseType>>({
		method: "patch",
		url: `/v1/countries/${variables?.id}`,
		...options,
	});

export const getCountries = ({ ...options }: AxiosRequestConfig<GetCountriesDataType>) =>
	axiosInstance<GetCountriesResponseType, AxiosResponseProps<GetCountriesResponseType>>({
		url: "/v1/countries",
		...options,
	});

export const getSingleCountry = ({
	variables,
	...options
}: AxiosRequestConfig<GetSingleCountryDataType> & { variables: { id: string } }) =>
	axiosInstance<GetSingleCountryResponseType, AxiosResponseProps<GetSingleCountryResponseType>>({
		url: `/v1/countries/${variables?.id}`,
		...options,
	});

export const deleteSingleCountry = ({
	variables,
	...options
}: AxiosRequestConfig<DeleteSingleCountryDataType> & { variables: { id: string } }) =>
	axiosInstance<
		DeleteSingleCountryResponseType,
		AxiosResponseProps<DeleteSingleCountryResponseType>
	>({
		method: "delete",
		url: `/v1/countries/${variables?.id}`,
		...options,
	});

export const restoreSingleCountry = ({
	variables,
	...options
}: AxiosRequestConfig<RestoreSingleCountryDataType> & { variables: { id: string } }) =>
	axiosInstance<
		RestoreSingleCountryResponseType,
		AxiosResponseProps<RestoreSingleCountryResponseType>
	>({
		method: "patch",
		url: `/v1/countries/${variables?.id}/restore`,
		...options,
	});

import axiosInstance, { type AxiosRequestConfig, type AxiosResponseProps } from "config/axios";
import IAddress from "interfaces/Address.interface";

// request and response types
export type PostAddressDataType = object;
export type PostAddressResponseType = IAddress;
export type PatchAddressDataType = object;
export type PatchAddressResponseType = IAddress;
export type GetAddressesDataType = {
	page?: number | undefined;
	limit?: number | undefined;
	sort?: string | undefined;
	offset?: number | undefined;
	pagination?: boolean | undefined;
	q?: string | undefined;
	deleted?: boolean | number | undefined;
};
export type GetAddressesResponseType = IAddress[];
export type GetSingleAddressDataType = object;
export type GetSingleAddressResponseType = IAddress;
export type DeleteSingleAddressDataType = object;
export type DeleteSingleAddressResponseType = object;

export const postAddress = ({ ...options }: AxiosRequestConfig<PostAddressDataType>) =>
	axiosInstance<PostAddressResponseType, AxiosResponseProps<PostAddressResponseType>>({
		method: "post",
		url: "/v1/addresses",
		...options,
	});

export const patchAddress = ({
	variables,
	...options
}: AxiosRequestConfig<PatchAddressDataType> & { variables: { id: string } }) =>
	axiosInstance<PatchAddressResponseType, AxiosResponseProps<PatchAddressResponseType>>({
		method: "patch",
		url: `/v1/addresses/${variables?.id}`,
		...options,
	});

export const getAddresses = ({ ...options }: AxiosRequestConfig<GetAddressesDataType>) =>
	axiosInstance<GetAddressesResponseType, AxiosResponseProps<GetAddressesResponseType>>({
		url: "/v1/addresses",
		...options,
	});

export const getSingleAddress = ({
	variables,
	...options
}: AxiosRequestConfig<GetSingleAddressDataType> & { variables: { id: string } }) =>
	axiosInstance<GetSingleAddressResponseType, AxiosResponseProps<GetSingleAddressResponseType>>({
		url: `/v1/addresses/${variables?.id}`,
		...options,
	});

export const deleteSingleAddress = ({
	variables,
	...options
}: AxiosRequestConfig<DeleteSingleAddressDataType> & { variables: { id: string } }) =>
	axiosInstance<
		DeleteSingleAddressResponseType,
		AxiosResponseProps<DeleteSingleAddressResponseType>
	>({
		method: "delete",
		url: `/v1/addresses/${variables?.id}`,
		...options,
	});

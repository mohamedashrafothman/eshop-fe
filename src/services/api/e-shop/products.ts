import axiosInstance, { type AxiosRequestConfig, type AxiosResponseProps } from "config/axios";
import IProduct from "interfaces/Product.interface";

// request and response types
export type PostProductDataType = FormData;
export type PostProductResponseType = IProduct;
export type PatchProductDataType = FormData;
export type PatchProductResponseType = IProduct;
export type GetProductsDataType = {
	page?: number | undefined;
	limit?: number | undefined;
	sort?: string | undefined;
	offset?: number | undefined;
	pagination?: boolean | undefined;
	q?: string | undefined;
	deleted?: boolean | number | undefined;
	categories?: string[] | undefined;
	brands?: string[] | undefined;
	colors?: string[] | undefined;
	sizes?: string[] | undefined;
	minPrice?: number | undefined;
	maxPrice?: number | undefined;
};
export type GetProductsResponseType = IProduct[];
export type GetSingleProductDataType = object;
export type GetSingleProductResponseType = IProduct;
export type DeleteSingleProductDataType = object;
export type DeleteSingleProductResponseType = object;
export type RestoreSingleProductDataType = object;
export type RestoreSingleProductResponseType = object;

export const postProduct = ({ ...options }: AxiosRequestConfig<PostProductDataType>) =>
	axiosInstance<PostProductResponseType, AxiosResponseProps<PostProductResponseType>>({
		method: "post",
		url: "/v1/products",
		...options,
	});

export const patchProduct = ({
	variables,
	...options
}: AxiosRequestConfig<PatchProductDataType> & { variables: { id: string } }) =>
	axiosInstance<PatchProductResponseType, AxiosResponseProps<PatchProductResponseType>>({
		method: "patch",
		url: `/v1/products/${variables?.id}`,
		...options,
	});

export const getProducts = ({ ...options }: AxiosRequestConfig<GetProductsDataType>) =>
	axiosInstance<GetProductsResponseType, AxiosResponseProps<GetProductsResponseType>>({
		url: "/v1/products",
		...options,
	});

export const getSingleProduct = ({
	variables,
	...options
}: AxiosRequestConfig<GetSingleProductDataType> & { variables: { id: string } }) =>
	axiosInstance<GetSingleProductResponseType, AxiosResponseProps<GetSingleProductResponseType>>({
		url: `/v1/products/${variables?.id}`,
		...options,
	});

export const deleteSingleProduct = ({
	variables,
	...options
}: AxiosRequestConfig<DeleteSingleProductDataType> & { variables: { id: string } }) =>
	axiosInstance<
		DeleteSingleProductResponseType,
		AxiosResponseProps<DeleteSingleProductResponseType>
	>({
		method: "delete",
		url: `/v1/products/${variables?.id}`,
		...options,
	});

export const restoreSingleProduct = ({
	variables,
	...options
}: AxiosRequestConfig<RestoreSingleProductDataType> & { variables: { id: string } }) =>
	axiosInstance<
		RestoreSingleProductResponseType,
		AxiosResponseProps<RestoreSingleProductResponseType>
	>({
		method: "patch",
		url: `/v1/products/${variables?.id}/restore`,
		...options,
	});

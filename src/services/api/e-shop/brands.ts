import axiosInstance, { type AxiosRequestConfig, type AxiosResponseProps } from "config/axios";
import IBrand from "interfaces/Brand.interface";

// request and response types
export type PostBrandDataType = Pick<IBrand, "name" | "description"> & { logo?: File | undefined };
export type PostBrandResponseType = IBrand;
export type PatchBrandDataType = Partial<Pick<IBrand, "name" | "description">> & {
	logo?: File | undefined;
};
export type PatchBrandResponseType = IBrand;
export type GetBrandsDataType = {
	page?: number | undefined;
	limit?: number | undefined;
	sort?: string | undefined;
	offset?: number | undefined;
	pagination?: boolean | undefined;
	q?: string | undefined;
	deleted?: boolean | number | undefined;
};
export type GetBrandsResponseType = IBrand[];
export type GetSingleBrandDataType = object;
export type GetSingleBrandResponseType = IBrand;
export type DeleteSingleBrandDataType = object;
export type DeleteSingleBrandResponseType = object;
export type RestoreSingleBrandDataType = object;
export type RestoreSingleBrandResponseType = object;

export const postBrand = ({ ...options }: AxiosRequestConfig<PostBrandDataType>) =>
	axiosInstance<PostBrandResponseType, AxiosResponseProps<PostBrandResponseType>>({
		method: "post",
		url: "/v1/brands",
		...options,
	});

export const patchBrand = ({
	variables,
	...options
}: AxiosRequestConfig<PatchBrandDataType> & { variables: { id: string } }) =>
	axiosInstance<PatchBrandResponseType, AxiosResponseProps<PatchBrandResponseType>>({
		method: "patch",
		url: `/v1/brands/${variables?.id}`,
		...options,
	});

export const getBrands = ({ ...options }: AxiosRequestConfig<GetBrandsDataType>) =>
	axiosInstance<GetBrandsResponseType, AxiosResponseProps<GetBrandsResponseType>>({
		url: "/v1/brands",
		...options,
	});

export const getSingleBrand = ({
	variables,
	...options
}: AxiosRequestConfig<GetSingleBrandDataType> & { variables: { id: string } }) =>
	axiosInstance<GetSingleBrandResponseType, AxiosResponseProps<GetSingleBrandResponseType>>({
		url: `/v1/brands/${variables?.id}`,
		...options,
	});

export const deleteSingleBrand = ({
	variables,
	...options
}: AxiosRequestConfig<DeleteSingleBrandDataType> & { variables: { id: string } }) =>
	axiosInstance<DeleteSingleBrandResponseType, AxiosResponseProps<DeleteSingleBrandResponseType>>(
		{
			method: "delete",
			url: `/v1/brands/${variables?.id}`,
			...options,
		}
	);

export const restoreSingleBrand = ({
	variables,
	...options
}: AxiosRequestConfig<RestoreSingleBrandDataType> & { variables: { id: string } }) =>
	axiosInstance<
		RestoreSingleBrandResponseType,
		AxiosResponseProps<RestoreSingleBrandResponseType>
	>({
		method: "patch",
		url: `/v1/brands/${variables?.id}`,
		...options,
	});

import axiosInstance, { type AxiosRequestConfig, type AxiosResponseProps } from "config/axios";
import ICategory from "interfaces/Category.interface";

// request and response types
export type PostCategoryDataType = FormData;
export type PostCategoryResponseType = ICategory;
export type PatchCategoryDataType = FormData;
export type PatchCategoryResponseType = ICategory;
export type GetCategoriesDataType = {
	page?: number | undefined;
	limit?: number | undefined;
	sort?: string | undefined;
	offset?: number | undefined;
	pagination?: boolean | undefined;
	q?: string | undefined;
	deleted?: boolean | number | undefined;
};
export type GetCategoriesResponseType = ICategory[];
export type GetSingleCategoryDataType = object;
export type GetSingleCategoryResponseType = ICategory;
export type DeleteSingleCategoryDataType = object;
export type DeleteSingleCategoryResponseType = object;
export type RestoreSingleCategoryDataType = object;
export type RestoreSingleCategoryResponseType = object;

export const postCategory = ({ ...options }: AxiosRequestConfig<PostCategoryDataType>) =>
	axiosInstance<PostCategoryResponseType, AxiosResponseProps<PostCategoryResponseType>>({
		method: "post",
		url: "/v1/categories",
		...options,
	});

export const patchCategory = ({
	variables,
	...options
}: AxiosRequestConfig<PatchCategoryDataType> & { variables: { id: string } }) =>
	axiosInstance<PatchCategoryResponseType, AxiosResponseProps<PatchCategoryResponseType>>({
		method: "patch",
		url: `/v1/categories/${variables?.id}`,
		...options,
	});

export const getCategories = ({ ...options }: AxiosRequestConfig<GetCategoriesDataType>) =>
	axiosInstance<GetCategoriesResponseType, AxiosResponseProps<GetCategoriesResponseType>>({
		url: "/v1/categories",
		...options,
	});

export const getSingleCategory = ({
	variables,
	...options
}: AxiosRequestConfig<GetSingleCategoryDataType> & { variables: { id: string } }) =>
	axiosInstance<GetSingleCategoryResponseType, AxiosResponseProps<GetSingleCategoryResponseType>>(
		{
			url: `/v1/categories/${variables?.id}`,
			...options,
		}
	);

export const deleteSingleCategory = ({
	variables,
	...options
}: AxiosRequestConfig<DeleteSingleCategoryDataType> & { variables: { id: string } }) =>
	axiosInstance<
		DeleteSingleCategoryResponseType,
		AxiosResponseProps<DeleteSingleCategoryResponseType>
	>({
		method: "delete",
		url: `/v1/categories/${variables?.id}`,
		...options,
	});

export const restoreSingleCategory = ({
	variables,
	...options
}: AxiosRequestConfig<RestoreSingleCategoryDataType> & { variables: { id: string } }) =>
	axiosInstance<
		RestoreSingleCategoryResponseType,
		AxiosResponseProps<RestoreSingleCategoryResponseType>
	>({
		method: "patch",
		url: `/v1/categories/${variables?.id}/restore`,
		...options,
	});

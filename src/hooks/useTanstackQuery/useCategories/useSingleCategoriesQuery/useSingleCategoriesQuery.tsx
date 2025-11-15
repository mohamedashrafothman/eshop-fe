"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import { SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useCategories";
import {
	getSingleCategory as queryFn,
	type GetSingleCategoryResponseType,
} from "services/api/e-shop/categories";

const useSingleCategoriesQuery = (id: string) =>
	useQuery<GetSingleCategoryResponseType, AxiosErrorProps>({
		queryKey: [...SINGLE_KEY_ARRAY, id],
		queryFn: () => queryFn({ variables: { id } }).then(({ data }) => data?.entities?.data),
		enabled: !!id,
	});

export default useSingleCategoriesQuery;

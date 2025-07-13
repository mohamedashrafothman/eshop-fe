"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosResponseProps } from "config/axios";
import { ALL_KEY_ARRAY } from "hooks/useTanstackQuery/useCategories";
import {
	getCategories as queryFn,
	type GetCategoriesDataType,
	type GetCategoriesResponseType,
} from "services/api/e-shop/categories";

const useCategoriesQuery = (query: GetCategoriesDataType | undefined) =>
	useQuery<
		Pick<AxiosResponseProps<GetCategoriesResponseType>, "data">["data"]["entities"],
		AxiosErrorProps
	>({
		queryKey: [...ALL_KEY_ARRAY, { ...(query || {}) }],
		queryFn: () =>
			queryFn({ params: query || {} }).then(({ data: { entities } }) => entities || {}),
	});

export default useCategoriesQuery;

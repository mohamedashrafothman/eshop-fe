"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosResponseProps } from "config/axios";
import { INFINITY_KEY_ARRAY } from "hooks/useTanstackQuery/useProducts";
import {
	getProducts as queryFn,
	type GetProductsDataType,
	type GetProductsResponseType,
} from "services/api/e-shop/products";
import { isObject } from "utils/helpers";

const useProductsInfinityQuery = (query: GetProductsDataType | undefined) =>
	useInfiniteQuery<
		Pick<AxiosResponseProps<GetProductsResponseType>, "data">["data"]["entities"],
		AxiosErrorProps
	>({
		queryKey: [...INFINITY_KEY_ARRAY, { ...(query || {}) }],
		queryFn: ({ pageParam = 1 }) =>
			queryFn({ params: { page: pageParam, ...(query || {}) } }).then(
				({ data: { entities } }) => entities || {}
			),
		initialPageParam: 1,
		enabled: isObject(query),
		maxPages: 1,
		getNextPageParam: (lastPage) => lastPage?.meta?.pagination?.nextPage,
		getPreviousPageParam: (firstPage) => firstPage?.meta?.pagination?.prevPage,
	});

export default useProductsInfinityQuery;

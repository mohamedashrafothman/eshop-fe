"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosResponseProps } from "config/axios";
import { ALL_KEY_ARRAY } from "hooks/useTanstackQuery/useProducts";
import {
	getProducts as queryFn,
	type GetProductsDataType,
	type GetProductsResponseType,
} from "services/api/e-shop/products";

const useProductsQuery = (query: GetProductsDataType | undefined) =>
	useQuery<
		Pick<AxiosResponseProps<GetProductsResponseType>, "data">["data"]["entities"],
		AxiosErrorProps
	>({
		queryKey: [...ALL_KEY_ARRAY, { ...(query || {}) }],
		queryFn: () =>
			queryFn({ params: query || {} }).then(({ data: { entities } }) => entities || {}),
	});

export default useProductsQuery;

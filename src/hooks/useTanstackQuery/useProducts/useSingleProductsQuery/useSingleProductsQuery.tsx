"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import { SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useProducts";
import {
	getSingleProduct as queryFn,
	type GetSingleProductResponseType,
} from "services/api/e-shop/products";

const useSingleProductsQuery = (id: string) =>
	useQuery<GetSingleProductResponseType, AxiosErrorProps>({
		queryKey: [...SINGLE_KEY_ARRAY, id],
		queryFn: () => queryFn({ variables: { id } }).then(({ data }) => data?.entities?.data),
		enabled: !!id,
	});

export default useSingleProductsQuery;

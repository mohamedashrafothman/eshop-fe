"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import { useSession } from "next-auth/react";
import {
	getSingleCategory as queryFn,
	type GetSingleCategoryResponseType,
} from "services/api/e-shop/categories";

export const KEY_ARRAY = ["categories", "single"];

const useSingleCategoriesQuery = (id: string) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useQuery<GetSingleCategoryResponseType, AxiosErrorProps>({
		queryKey: [...KEY_ARRAY, id],
		queryFn: () => queryFn({ variables: { id } }).then(({ data }) => data?.entities?.data),
		enabled: isAuthenticated && !!id,
	});
};

export default useSingleCategoriesQuery;

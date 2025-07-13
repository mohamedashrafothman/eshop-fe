"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import { SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useBrands";
import { useSession } from "next-auth/react";
import {
	getSingleBrand as queryFn,
	type GetSingleBrandResponseType,
} from "services/api/e-shop/brands";

const useSingleBrandsQuery = (id: string) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useQuery<GetSingleBrandResponseType, AxiosErrorProps>({
		queryKey: [...SINGLE_KEY_ARRAY, id],
		queryFn: () => queryFn({ variables: { id } }).then(({ data }) => data?.entities?.data),
		enabled: isAuthenticated && !!id,
	});
};

export default useSingleBrandsQuery;

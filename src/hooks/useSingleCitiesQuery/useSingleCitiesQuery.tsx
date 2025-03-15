"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import { useSession } from "next-auth/react";
import {
	getSingleCity as queryFn,
	type GetSingleCityResponseType,
} from "services/api/e-shop/cities";

export const KEY_ARRAY = ["cities", "single"];

const useSingleCitiesQuery = (id: string) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useQuery<GetSingleCityResponseType, AxiosErrorProps>({
		queryKey: [...KEY_ARRAY, id],
		queryFn: () => queryFn({ variables: { id } }).then(({ data }) => data?.entities?.data),
		enabled: isAuthenticated && !!id,
	});
};

export default useSingleCitiesQuery;

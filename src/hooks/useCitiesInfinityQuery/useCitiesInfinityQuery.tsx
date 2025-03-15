"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosResponseProps } from "config/axios";
import { useSession } from "next-auth/react";
import {
	getCities as queryFn,
	type GetCitiesDataType,
	type GetCitiesResponseType,
} from "services/api/e-shop/cities";
import { isObject } from "utils/helpers";

export const KEY_ARRAY = ["cities"];

const useCitiesInfinityQuery = (query: GetCitiesDataType | undefined) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useInfiniteQuery<
		Pick<AxiosResponseProps<GetCitiesResponseType>, "data">["data"]["entities"],
		AxiosErrorProps
	>({
		queryKey: [...KEY_ARRAY, { ...(query || {}) }],
		queryFn: ({ pageParam = 1 }) =>
			queryFn({ params: { page: pageParam, ...(query || {}) } }).then(
				({ data: { entities } }) => entities || {}
			),
		initialPageParam: 1,
		enabled: isAuthenticated && isObject(query),
		maxPages: 1,
		getNextPageParam: (lastPage) => lastPage?.meta?.pagination?.nextPage,
		getPreviousPageParam: (firstPage) => firstPage?.meta?.pagination?.prevPage,
	});
};

export default useCitiesInfinityQuery;

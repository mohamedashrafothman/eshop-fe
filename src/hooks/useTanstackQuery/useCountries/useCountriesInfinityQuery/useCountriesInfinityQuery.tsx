"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosResponseProps } from "config/axios";
import { INFINITY_KEY_ARRAY } from "hooks/useTanstackQuery/useCountries";
import { useSession } from "next-auth/react";
import {
	getCountries as queryFn,
	type GetCountriesDataType,
	type GetCountriesResponseType,
} from "services/api/e-shop/countries";
import { isObject } from "utils/helpers";

const useCountriesInfinityQuery = (query: GetCountriesDataType | undefined) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useInfiniteQuery<
		Pick<AxiosResponseProps<GetCountriesResponseType>, "data">["data"]["entities"],
		AxiosErrorProps
	>({
		queryKey: [...INFINITY_KEY_ARRAY, { ...(query || {}) }],
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

export default useCountriesInfinityQuery;

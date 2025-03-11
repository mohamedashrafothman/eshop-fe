"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosResponseProps } from "config/axios";
import { useSession } from "next-auth/react";
import {
	getCountries as queryFn,
	type GetCountriesDataType,
	type GetCountriesResponseType,
} from "services/api/e-shop/countries";
import { isObject } from "utils/helpers";

export const KEY_ARRAY = ["countries"];

const useCountriesQuery = (query: GetCountriesDataType | undefined) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useQuery<
		Pick<AxiosResponseProps<GetCountriesResponseType>, "data">["data"]["entities"],
		AxiosErrorProps
	>({
		queryKey: [...KEY_ARRAY, { ...(query || {}) }],
		queryFn: () =>
			queryFn({ params: query || {} }).then(({ data: { entities } }) => entities || {}),
		enabled: isAuthenticated && isObject(query),
	});
};

export default useCountriesQuery;

"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosResponseProps } from "config/axios";
import { ALL_KEY_ARRAY } from "hooks/useTanstackQuery/useCities";
import { useSession } from "next-auth/react";
import {
	getCities as queryFn,
	type GetCitiesDataType,
	type GetCitiesResponseType,
} from "services/api/e-shop/cities";
import { isObject } from "utils/helpers";

const useCitiesQuery = (
	query: GetCitiesDataType | undefined,
	options: { enabled?: boolean } = { enabled: true }
) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useQuery<
		Pick<AxiosResponseProps<GetCitiesResponseType>, "data">["data"]["entities"],
		AxiosErrorProps
	>({
		queryKey: [...ALL_KEY_ARRAY, { ...(query || {}) }],
		queryFn: () =>
			queryFn({ params: query || {} }).then(({ data: { entities } }) => entities || {}),
		enabled: isAuthenticated && isObject(query) && options.enabled,
	});
};

export default useCitiesQuery;

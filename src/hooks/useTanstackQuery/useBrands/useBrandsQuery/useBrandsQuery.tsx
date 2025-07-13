"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosResponseProps } from "config/axios";
import { ALL_KEY_ARRAY } from "hooks/useTanstackQuery/useBrands";
import { useSession } from "next-auth/react";
import {
	getBrands as queryFn,
	type GetBrandsDataType,
	type GetBrandsResponseType,
} from "services/api/e-shop/brands";
import { isObject } from "utils/helpers";

const useBrandsQuery = (
	query: GetBrandsDataType | undefined,
	options: { enabled?: boolean } = { enabled: true }
) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useQuery<
		Pick<AxiosResponseProps<GetBrandsResponseType>, "data">["data"]["entities"],
		AxiosErrorProps
	>({
		queryKey: [...ALL_KEY_ARRAY, { ...(query || {}) }],
		queryFn: () =>
			queryFn({ params: query || {} }).then(({ data: { entities } }) => entities || {}),
		enabled: isAuthenticated && isObject(query) && options.enabled,
	});
};

export default useBrandsQuery;

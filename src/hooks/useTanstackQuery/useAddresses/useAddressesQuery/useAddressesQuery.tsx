"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosResponseProps } from "config/axios";
import { ALL_KEY_ARRAY } from "hooks/useTanstackQuery/useAddresses";
import { useSession } from "next-auth/react";
import {
	getAddresses as queryFn,
	type GetAddressesDataType,
	type GetAddressesResponseType,
} from "services/api/e-shop/addresses";
import { isObject } from "utils/helpers";

const useAddressesQuery = (
	query: GetAddressesDataType | undefined,
	options: { enabled?: boolean } = { enabled: true }
) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useQuery<
		Pick<AxiosResponseProps<GetAddressesResponseType>, "data">["data"]["entities"],
		AxiosErrorProps
	>({
		queryKey: [...ALL_KEY_ARRAY, { ...(query || {}) }],
		queryFn: () =>
			queryFn({ params: query || {} }).then(({ data: { entities } }) => entities || {}),
		enabled: isAuthenticated && isObject(query) && options.enabled,
	});
};

export default useAddressesQuery;

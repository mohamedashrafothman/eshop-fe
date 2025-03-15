"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosResponseProps } from "config/axios";
import { useSession } from "next-auth/react";
import {
	getStates as queryFn,
	type GetStatesDataType,
	type GetStatesResponseType,
} from "services/api/e-shop/states";
import { isObject } from "utils/helpers";

export const KEY_ARRAY = ["states"];

const useStatesQuery = (
	query: GetStatesDataType | undefined,
	options: { enabled?: boolean } = { enabled: true }
) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useQuery<
		Pick<AxiosResponseProps<GetStatesResponseType>, "data">["data"]["entities"],
		AxiosErrorProps
	>({
		queryKey: [...KEY_ARRAY, { ...(query || {}) }],
		queryFn: () =>
			queryFn({ params: query || {} }).then(({ data: { entities } }) => entities || {}),
		enabled: isAuthenticated && isObject(query) && options.enabled,
	});
};

export default useStatesQuery;

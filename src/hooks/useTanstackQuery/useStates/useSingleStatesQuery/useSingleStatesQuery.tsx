"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import { SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useStates";
import { useSession } from "next-auth/react";
import {
	getSingleState as queryFn,
	type GetSingleStateResponseType,
} from "services/api/e-shop/states";

const useSingleStatesQuery = (id: string) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useQuery<GetSingleStateResponseType, AxiosErrorProps>({
		queryKey: [...SINGLE_KEY_ARRAY, id],
		queryFn: () => queryFn({ variables: { id } }).then(({ data }) => data?.entities?.data),
		enabled: isAuthenticated && !!id,
	});
};

export default useSingleStatesQuery;

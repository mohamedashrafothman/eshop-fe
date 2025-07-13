"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import { SINGLE_KEY_ARRAY } from "hooks/useTanstackQuery/useAddresses";
import { useSession } from "next-auth/react";
import {
	getSingleAddress as queryFn,
	type GetSingleAddressResponseType,
} from "services/api/e-shop/addresses";

const useSingleAddressesQuery = (id: string) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useQuery<GetSingleAddressResponseType, AxiosErrorProps>({
		queryKey: [...SINGLE_KEY_ARRAY, id],
		queryFn: () => queryFn({ variables: { id } }).then(({ data }) => data?.entities?.data),
		enabled: isAuthenticated && !!id,
	});
};

export default useSingleAddressesQuery;

"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import { useSession } from "next-auth/react";
import {
	getSingleAddress as queryFn,
	type GetSingleAddressResponseType,
} from "services/api/e-shop/addresses";

export const KEY_ARRAY = ["addresses", "single"];

const useSingleAddressesQuery = (id: string) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useQuery<GetSingleAddressResponseType, AxiosErrorProps>({
		queryKey: [...KEY_ARRAY, id],
		queryFn: () => queryFn({ variables: { id } }).then(({ data }) => data?.entities?.data),
		enabled: isAuthenticated && !!id,
	});
};

export default useSingleAddressesQuery;

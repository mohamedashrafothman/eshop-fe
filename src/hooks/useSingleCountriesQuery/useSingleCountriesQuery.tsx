"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import { useSession } from "next-auth/react";
import {
	getSingleCountry as queryFn,
	type GetSingleCountryResponseType,
} from "services/api/e-shop/countries";

export const KEY_ARRAY = ["countries", "single"];

const useSingleCountriesQuery = (id: string) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useQuery<GetSingleCountryResponseType, AxiosErrorProps>({
		queryKey: [...KEY_ARRAY, id],
		queryFn: () => queryFn({ variables: { id } }).then(({ data }) => data?.entities?.data),
		enabled: isAuthenticated && !!id,
	});
};

export default useSingleCountriesQuery;

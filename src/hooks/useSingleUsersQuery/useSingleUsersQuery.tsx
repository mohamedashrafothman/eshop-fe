"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import { useSession } from "next-auth/react";
import {
	getSingleUser as queryFn,
	type GetSingleUserResponseType,
} from "services/api/e-shop/users";

export const KEY_ARRAY = ["users", "single"];

const useSingleUsersQuery = (id: string) => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useQuery<GetSingleUserResponseType, AxiosErrorProps>({
		queryKey: [...KEY_ARRAY, id],
		queryFn: () => queryFn({ variables: { id } }).then(({ data }) => data?.entities?.data),
		enabled: isAuthenticated && !!id,
	});
};

export default useSingleUsersQuery;

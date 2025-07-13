"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import { ME_KEY_ARRAY } from "hooks/useTanstackQuery/useUsers";
import { useSession } from "next-auth/react";
import { getMe as queryFn, type GetMeResponseType } from "services/api/e-shop/users";

const useMeQuery = () => {
	const session = useSession();
	const isAuthenticated = session.status === "authenticated";

	return useQuery<GetMeResponseType, AxiosErrorProps>({
		queryKey: ME_KEY_ARRAY,
		queryFn: () => queryFn({}).then(({ data }) => data?.entities?.data),
		enabled: isAuthenticated,
		placeholderData: session.data?.user,
	});
};

export default useMeQuery;

"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosResponseProps } from "config/axios";
import { useSession } from "next-auth/react";
import { getMe as queryFn, type GetMeResponseType } from "services/api/e-shop/users";

export const KEY_ARRAY = ["users", "me"];

const useMeQuery = () => {
	const session = useSession();

	return useQuery<AxiosResponseProps<GetMeResponseType>, AxiosErrorProps>({
		queryKey: KEY_ARRAY,
		queryFn,
		enabled: session.status === "authenticated",
	});
};

export default useMeQuery;

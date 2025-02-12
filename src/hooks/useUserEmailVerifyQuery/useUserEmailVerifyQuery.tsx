"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import {
	getUserEmailVerify as queryFn,
	type GetUserEmailVerifyResponseType,
} from "services/api/e-shop/users";

export const KEY_ARRAY = ["users", "email", "verify"];

const useUserEmailVerifyQuery = (variables: any) =>
	useQuery<GetUserEmailVerifyResponseType, AxiosErrorProps>({
		queryKey: [...KEY_ARRAY, variables],
		queryFn: () => queryFn({ variables }),
		enabled: false,
	});

export default useUserEmailVerifyQuery;

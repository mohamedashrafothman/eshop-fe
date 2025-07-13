"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import { VERIFY_EMAIL_KEY_ARRAY } from "hooks/useTanstackQuery/useUsers";
import {
	getUserEmailVerify as queryFn,
	type GetUserEmailVerifyResponseType,
} from "services/api/e-shop/users";

const useUserEmailVerifyQuery = (variables: any) =>
	useQuery<GetUserEmailVerifyResponseType, AxiosErrorProps>({
		queryKey: [...VERIFY_EMAIL_KEY_ARRAY, variables],
		queryFn: () => queryFn({ variables }),
		enabled: false,
	});

export default useUserEmailVerifyQuery;

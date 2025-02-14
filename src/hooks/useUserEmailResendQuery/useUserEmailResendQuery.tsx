"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import {
	getUserEmailResend as queryFn,
	type GetUserEmailResendResponseType,
} from "services/api/e-shop/users";

export const KEY_ARRAY = ["users", "email", "verify", "resend"];

const useUserEmailResendQuery = (variables: any) =>
	useQuery<GetUserEmailResendResponseType, AxiosErrorProps>({
		queryKey: [...KEY_ARRAY, variables],
		queryFn: () => queryFn({ variables }),
		enabled: false,
	});

export default useUserEmailResendQuery;

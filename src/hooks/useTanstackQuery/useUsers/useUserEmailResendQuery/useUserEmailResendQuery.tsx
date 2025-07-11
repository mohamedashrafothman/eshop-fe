"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import { RESEND_VERIFY_EMAIL_KEY_ARRAY } from "hooks/useTanstackQuery/useUsers";
import {
	getUserEmailResend as queryFn,
	type GetUserEmailResendResponseType,
} from "services/api/e-shop/users";

const useUserEmailResendQuery = (variables: any) =>
	useQuery<GetUserEmailResendResponseType, AxiosErrorProps>({
		queryKey: [...RESEND_VERIFY_EMAIL_KEY_ARRAY, variables],
		queryFn: () => queryFn({ variables }),
		enabled: false,
	});

export default useUserEmailResendQuery;

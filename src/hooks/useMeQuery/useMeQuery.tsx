"use client";

import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosResponseProps } from "config/axios";
import { getMe as queryFn, type GetMeResponseType } from "services/api/e-shop/users";

export const KEY_ARRAY = ["users", "me"];

const useMeQuery = () =>
	useQuery<AxiosResponseProps<GetMeResponseType>, AxiosErrorProps>({
		queryKey: KEY_ARRAY,
		queryFn,
	});

export default useMeQuery;

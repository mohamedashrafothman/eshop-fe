import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps, type AxiosResponseProps } from "config/axios";
import {
	getUnlinkSocialMedia as queryFn,
	type GetUnlinkSocialMediaDataType,
} from "services/api/e-shop.com/auth";

export const KEY_ARRAY = ["auth", "login", "social", "unlink"];

const useUnlinkSocialQuery = () =>
	useQuery<AxiosResponseProps<GetUnlinkSocialMediaDataType>, AxiosErrorProps>({
		queryKey: KEY_ARRAY,
		queryFn,
	});

export default useUnlinkSocialQuery;

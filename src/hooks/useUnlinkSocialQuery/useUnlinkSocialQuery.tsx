import { useQuery } from "@tanstack/react-query";
import { type AxiosErrorProps } from "config/axios";
import { postUnlinkSocialMedia as queryFn } from "services/api/e-shop.com/auth";

export const KEY_ARRAY = ["auth", "login", "social", "unlink"];

const useUnlinkSocialQuery = () => useQuery<{}, AxiosErrorProps>({ queryKey: KEY_ARRAY, queryFn });

export default useUnlinkSocialQuery;

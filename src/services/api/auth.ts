import { axiosRequest } from "config/axios";

// constants
export const LOGIN_URL = "/auth/login";
export const REGISTER_URL = "/auth/register";

// requests methods
export const postLogin = ({ ...options }) =>
	axiosRequest({ ...options, method: "post", url: LOGIN_URL });

export const postRegister = ({ ...options }) =>
	axiosRequest({ ...options, method: "post", url: REGISTER_URL });

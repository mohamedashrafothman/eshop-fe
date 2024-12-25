// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { type AxiosErrorProps, type AxiosRequestProps } from "config/axios";
// import { postLogin } from "services/api/auth";
// import { type Session } from "store/session";
// import { type LoginData } from "views/forms/Login";

const useLoginMutation = () => {
	// const queryClient = useQueryClient();
	// queryClient.setMutationDefaults(["auth", "login"], {
	// 	mutationFn: (params) => postLogin(params),
	// });
	// return useMutation<
	// 	AxiosRequestProps<Omit<Session, "isAuthenticated">>,
	// 	AxiosErrorProps,
	// 	AxiosRequestProps<LoginData>
	// >(["auth", "login"]);
};

export default useLoginMutation;

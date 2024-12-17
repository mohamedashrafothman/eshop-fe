"use client";

import useAxiosInterceptor from "hooks/useAxiosInterceptor";

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	useAxiosInterceptor();

	return <>{children}</>;
};

export default Providers;

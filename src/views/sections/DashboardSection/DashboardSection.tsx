"use client";

import useMeQuery from "hooks/useMeQuery";

const DashboardSection = () => {
	const { data: me, isLoading, isError, error } = useMeQuery();

	if (isError && error?.status && error.status >= 500) throw error;
	if (isLoading) return <>Loading...</>;
	return <>{`Welcome ${me?.entities.data.name}`}</>;
};

export default DashboardSection;

"use client";

import {
	HydrationBoundary,
	isServer,
	QueryClient,
	QueryClientProvider,
	type DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = { children?: React.ReactNode; state: DehydratedState };

// The QueryClient should only be created once
let browserQueryClient: QueryClient | undefined = undefined;

const makeQueryClient = () => {
	// With SSR, we usually want to set some default staleTime
	// above 0 to avoid refetching immediately on the client
	return new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } });
};

const getQueryClient = () => {
	// Server: always make a new query client
	if (isServer) return makeQueryClient();
	// Browser: make a new query client if we don't already have one
	// This is very important, so we don't re-make a new client if React
	// suspends during the initial render. This may not be needed if we
	// have a suspense boundary BELOW the creation of the query client
	if (!browserQueryClient) browserQueryClient = makeQueryClient();
	return browserQueryClient;
};

const ReactQuery = ({ children, state }: Props) => (
	<QueryClientProvider client={getQueryClient()}>
		<HydrationBoundary state={state}>{children}</HydrationBoundary>
		<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
	</QueryClientProvider>
);

export default ReactQuery;

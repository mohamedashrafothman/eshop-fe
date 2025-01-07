import { isServer, QueryClient } from "@tanstack/react-query";

// The QueryClient should only be created once
let browserQueryClient: QueryClient | undefined = undefined;

// With SSR, we usually want to set some default staleTime
// above 0 to avoid refetching immediately on the client
const queryClientOptions = {
	defaultOptions: {
		queries: { staleTime: 60 * 1000, retry: 0, refetchOnWindowFocus: false },
		mutations: { retry: 0 },
	},
};
const makeQueryClient = () => new QueryClient(queryClientOptions);

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

const queryClient = getQueryClient();

export default queryClient;

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import "stylesheets/styles.scss";
import Providers from "views/Providers";

export const metadata: Metadata = {
	title: { default: "E-Shop", template: "%s | E-Shop" },
	description: "Description example...",
};

type Props = { children?: React.ReactNode };

const RootLayout = async ({ children }: Props) => {
	const queryClient = new QueryClient();
	/**
	 * NOTE: You can use queryClient to prefetch data
	 */

	return (
		<html lang="en" dir="ltr" data-bs-theme="light">
			<body>
				<Providers>
					<HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;

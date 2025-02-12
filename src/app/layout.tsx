import { dehydrate, QueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { getSession } from "config/next-auth";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "stylesheets/styles.scss";
import Providers from "views/Providers";
import SVGs from "views/sections/SVGs";

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	variable: "--e-shop-font-family",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: { default: "E-Shop", template: "%s | E-Shop" },
	description: "Description example...",
};

type Props = { children: React.ReactNode };

const RootLayout = async ({ children }: Props) => {
	const session = await getSession();
	const queryClient = new QueryClient();

	return (
		<html lang="en" dir="ltr" data-bs-theme="light" className={classNames(poppins.variable)}>
			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<SVGs />
				<div id="app">
					<Providers session={session} hydrationBoundaryState={dehydrate(queryClient)}>
						{children}
					</Providers>
				</div>
				<div id="portals"></div>
			</body>
		</html>
	);
};

export default RootLayout;

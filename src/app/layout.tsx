import type { Metadata, Viewport } from "next";
import "stylesheets/styles.scss";
import Providers from "views/Providers/Providers";

export const metadata: Metadata = {
	title: { default: "E-Shop", template: "%s | E-Shop" },
	description:
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat debitis tempore officiis aut consequuntur eius sequi numquam? Quam necessitatibus atque voluptatum ad asperiores eveniet ipsam nostrum mollitia perferendis consectetur? Mollitia.",
	applicationName: "E-Shop",
	keywords: "lorem, ipsum, dolor",
	authors: { name: "Mohamed Ashraf Othman - mohamedashrafothman@gmail.com" },
	twitter: {
		card: "summary_large_image",
		title: "E-shop",
		images: [{ url: "<SOCIAL_PREVIEW_IMAGE>", width: 400, height: 300, type: "image/*" }],
	},
	facebook: { appId: "<FACEBOOK_APP_ID>" },
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#fff",
	colorScheme: "light",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
	<html lang="en" dir="ltr" data-bs-theme="light">
		<body>
			<Providers>{children}</Providers>
		</body>
	</html>
);

export default RootLayout;

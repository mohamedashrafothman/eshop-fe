/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
	reactStrictMode: true,
	sassOptions: { includePaths: [path.join(__dirname, "./src/styles")] },
	images: { remotePatterns: [{ protocol: "https", hostname: "placehold.co" }] },
	redirects: () => [{ source: "/auth", destination: "/auth/login", permanent: true }],
};

module.exports = nextConfig;

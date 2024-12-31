import Image from "next/image";
import vars from "utils/vars";
import NextLink from "views/components/NextLink";

type Props = { logoSrc?: string };

const Logo = ({
	logoSrc = "https://placehold.co/177x50/ffffff/151515.png?text=E-Shop&font=roboto",
}: Props) => (
	<NextLink
		className="app-logo focus-ring rounded d-block w-fit-content p-1"
		href="/"
		title={`click for ${vars.app.name} home`}>
		<Image
			src={logoSrc}
			className="app-logo-image img-fluid text-reset"
			width={177}
			height={50}
			alt={vars.app.name}
			priority={true}
		/>
	</NextLink>
);

export default Logo;

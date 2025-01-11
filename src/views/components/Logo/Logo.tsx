import Image from "next/image";
import vars from "utils/vars";
import NextLink from "views/components/NextLink";

type Props = { logoSrc?: string; width?: number; height?: number };

const Logo = ({ logoSrc, width = 177, height = 50 }: Props) => (
	<NextLink
		className="app-logo focus-ring d-block w-fit-content p-1"
		href="/"
		title={`click for ${vars.app.name} home`}>
		<Image
			src={
				logoSrc ||
				`https://placehold.co/${width}x${height}/ffffff/151515.png?text=E-Shop&font=roboto`
			}
			className="app-logo-image img-fluid text-reset"
			width={width}
			height={height}
			alt={vars.app.name}
			priority={true}
		/>
	</NextLink>
);

export default Logo;

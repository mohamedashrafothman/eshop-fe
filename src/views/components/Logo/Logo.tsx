import Image from "next/image";
import vars from "utils/vars";
import NextLink from "views/components/NextLink";

type Props = { logoSrc?: string; width?: number; height?: number };

const Logo = ({ logoSrc, width = 177, height = 50 }: Props) => (
	<div className="app-logo w-fit-content p-1">
		<NextLink
			className="d-block focus-ring w-100"
			href="/"
			title={`click for ${vars.app.name} home`}>
			<Image
				src={
					logoSrc ||
					`https://placehold.co/${width}x${height}/f5f5f5/6a983c.png?text=E-Shop&font=roboto`
				}
				className="app-logo-image img-fluid text-reset"
				width={width}
				height={height}
				alt={vars.app.name}
				priority={true}
			/>
		</NextLink>
	</div>
);

export default Logo;

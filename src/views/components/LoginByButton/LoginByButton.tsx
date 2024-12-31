import { type ComponentPropsWithoutRef, type ReactNode } from "react";

type Props = {
	title: string;
	platform: "facebook" | "google";
	icon: ReactNode;
} & ComponentPropsWithoutRef<"button">;

const LoginByButton = ({ title, icon: Icon }: Props) => (
	<button
		type="button"
		className="btn btn-outline-primary border-primary-dark text-dark text-white-hover text-white-focus-visible w-100 text-capitalize icon-link gap-2 justify-content-center">
		{Icon}
		<strong>{title}</strong>
	</button>
);

export default LoginByButton;

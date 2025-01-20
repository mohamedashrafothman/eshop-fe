"use client";

import classNames from "classnames";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

export type Props = {
	title: string;
	icon: ReactNode;
	isLoading?: boolean | undefined;
} & ComponentPropsWithoutRef<"button">;

const OAuthButton = ({ title, icon: Icon, onClick, isLoading, className }: Props) => (
	<button
		type="button"
		className={classNames(
			"btn btn-outline-primary border-primary-dark text-dark text-white-hover text-white-focus-visible text-capitalize icon-link gap-2",
			className
		)}
		onClick={onClick}
		disabled={isLoading}>
		{isLoading ? (
			<span className="spinner-border spinner-border-sm" role="status">
				<span className="visually-hidden">Loading...</span>
			</span>
		) : (
			Icon
		)}
		<strong>{title}</strong>
	</button>
);

export default OAuthButton;

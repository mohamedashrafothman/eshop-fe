"use client";

import classNames from "classnames";

type Props = { children?: React.ReactNode | undefined } & React.HTMLAttributes<HTMLDivElement>;

const Main = ({ children, className = "" }: Props) => (
	<main id="main" className={classNames("app-main", className)}>
		{children}
	</main>
);

export default Main;

"use client";

import classNames from "classnames";

type Props = { children?: React.ReactNode | undefined } & React.HTMLAttributes<HTMLDivElement>;

const Main = ({ children, className = "" }: Props) => (
	<main className={classNames("app-main bg-white", className)}>{children}</main>
);

export default Main;

"use client";

import { default as ErrorSection } from "views/sections/Error";

type Props = {
	error: Error & { digest?: string | undefined; status?: number | undefined };
	reset: () => void;
};

const Error = ({ error, reset }: Props) => (
	<ErrorSection code={error?.status || undefined} message={error?.message} reset={reset} />
);

export default Error;

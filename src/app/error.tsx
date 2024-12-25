"use client"; // NOTE: Error boundaries must be Client Components

type Props = { error: Error & { digest?: string }; reset: () => void };

// TODO: Error Boundary UI Skeleton
const Error = ({ error, reset }: Props) => (
	<div>
		<h2>Something went wrong!</h2>
		<p>{error.message}</p>
		<button onClick={() => reset()}>Try again</button>
	</div>
);

export default Error;

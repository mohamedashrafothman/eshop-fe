import Link from "next/link";

// TODO: Not Found Error UI Skeleton
const NotFound = () => (
	<div>
		<h2>Not Found</h2>
		<p>Could not find requested resource</p>
		<Link href="/">Return Home</Link>
	</div>
);

export default NotFound;

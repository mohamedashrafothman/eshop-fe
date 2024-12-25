import Link from "next/link";

const Home = () => (
	<>
		Home Page
		<Link className="btn btn-link border-0 rounded-0" href="/auth/login">
			<strong>Login Page</strong>
		</Link>
	</>
);

export default Home;

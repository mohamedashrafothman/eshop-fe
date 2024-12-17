import { Metadata } from "next";
import Link from "next/link";
import { Button } from "react-bootstrap";

export const metadata: Metadata = {
	title: "About us",
};

const AboutUs = () => {
	return (
		<div>
			About Us page : Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio labore
			quaerat blanditiis ratione quam provident culpa non, quis quae impedit? Reiciendis quia
			itaque et facilis. Nihil omnis quod sint voluptatem!
			<Link href="/" passHref>
				<Button variant="link">
					<strong>Back to home</strong>
				</Button>
			</Link>
		</div>
	);
};

export default AboutUs;

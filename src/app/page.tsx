import Link from "next/link";
import { Button } from "react-bootstrap";

const Home = () => (
	<>
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab quod veritatis id consequatur
		provident, quia inventore eligendi rem autem qui aspernatur tempore dignissimos nam suscipit
		fugiat reprehenderit, assumenda tenetur repellendus.
		<Link href="/about-us" passHref>
			<Button variant="link">
				<strong>About us</strong>
			</Button>
		</Link>
	</>
);

export default Home;

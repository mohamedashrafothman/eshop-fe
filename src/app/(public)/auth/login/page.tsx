import { Metadata } from "next";
import Breadcrumb from "views/components/Breadcrumb";
import { default as LoginSection } from "views/sections/Login";

const PAGE_TITLE = "Login";
export const metadata: Metadata = { title: PAGE_TITLE };

const LoginPage = () => (
	<>
		<div className="pt-4">
			<div className="container">
				<Breadcrumb items={[{ href: "/auth/login", title: PAGE_TITLE }]} />
			</div>
		</div>
		<LoginSection title={PAGE_TITLE} />
	</>
);

export default LoginPage;

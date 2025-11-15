import { Metadata } from "next";
import Breadcrumb from "views/components/Breadcrumb";
import { default as RegisterSection } from "views/sections/Register";

const PAGE_TITLE = "Register";
export const metadata: Metadata = { title: PAGE_TITLE };

const RegisterPage = () => (
	<>
		<div className="container py-16px">
			<Breadcrumb items={[{ href: "/auth/register", title: PAGE_TITLE }]} />
		</div>
		<RegisterSection title={PAGE_TITLE} />
	</>
);

export default RegisterPage;

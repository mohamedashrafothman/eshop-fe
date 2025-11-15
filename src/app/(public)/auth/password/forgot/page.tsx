import { Metadata } from "next";
import Breadcrumb from "views/components/Breadcrumb";
import { default as ForgotPasswordSection } from "views/sections/ForgotPassword";

const PAGE_TITLE = "Forgot Password";
export const metadata: Metadata = { title: PAGE_TITLE };

const ForgotPasswordPage = () => (
	<>
		<div className="container py-16px">
			<Breadcrumb items={[{ href: "/auth/password/forgot", title: PAGE_TITLE }]} />
		</div>
		<ForgotPasswordSection title={PAGE_TITLE} />;
	</>
);

export default ForgotPasswordPage;

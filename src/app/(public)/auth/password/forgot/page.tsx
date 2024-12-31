import { Metadata } from "next";
import Breadcrumb from "views/components/Breadcrumb";
import { default as ForgotPasswordSection } from "views/sections/ForgotPassword";

const PAGE_TITLE = "Forgot Password";
export const metadata: Metadata = { title: PAGE_TITLE };

const ForgotPasswordPage = () => (
	<>
		<div className="pt-4">
			<div className="container">
				<Breadcrumb items={[{ href: "/auth/password/forgot", title: PAGE_TITLE }]} />
			</div>
		</div>
		<ForgotPasswordSection title={PAGE_TITLE} />;
	</>
);

export default ForgotPasswordPage;

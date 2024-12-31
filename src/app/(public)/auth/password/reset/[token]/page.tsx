import type { Metadata } from "next";
import Breadcrumb from "views/components/Breadcrumb";
import { default as ResetPasswordSection } from "views/sections/ResetPassword";

const PAGE_TITLE = "Reset Password";
export const metadata: Metadata = { title: PAGE_TITLE };

const ResetPasswordPage = () => (
	<>
		<div className="pt-4">
			<div className="container">
				<Breadcrumb items={[{ href: "/auth/password/forgot", title: PAGE_TITLE }]} />
			</div>
		</div>
		<ResetPasswordSection title={PAGE_TITLE} />
	</>
);

export default ResetPasswordPage;

import type { Metadata } from "next";
import Breadcrumb from "views/components/Breadcrumb";
import { default as ResetPasswordConfirmationSection } from "views/sections/ResetPasswordConfirmation";

const PAGE_TITLE = "Check your email!";
export const metadata: Metadata = { title: PAGE_TITLE };

const PasswordConfirmPage = () => (
	<>
		<div className="container">
			<Breadcrumb items={[{ href: "/auth/password/confirm", title: PAGE_TITLE }]} />
		</div>
		<ResetPasswordConfirmationSection title={PAGE_TITLE} />
	</>
);

export default PasswordConfirmPage;

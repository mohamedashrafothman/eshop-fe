import type { Metadata } from "next";
import Breadcrumb from "views/components/Breadcrumb";
import { default as UserEmailVerificationSection } from "views/sections/UserEmailVerification";

const PAGE_TITLE = "Email Verification";
export const metadata: Metadata = { title: PAGE_TITLE };

const EmailVerificationPage = () => (
	<>
		<div className="container py-16px">
			<Breadcrumb items={[{ href: "/user/email/verify", title: PAGE_TITLE }]} />
		</div>
		<UserEmailVerificationSection title={PAGE_TITLE} />;
	</>
);

export default EmailVerificationPage;

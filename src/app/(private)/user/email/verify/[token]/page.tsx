import type { Metadata } from "next";

export const metadata: Metadata = { title: "Email Verify" };

type Props = { params: { token: string } };

const EmailVerificationPage = ({ params: { token = "" } }: Props) => (
	<div>{`email verify page - ${token}`}</div>
);

export default EmailVerificationPage;

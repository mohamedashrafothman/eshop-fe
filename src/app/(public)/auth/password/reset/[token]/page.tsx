import type { Metadata } from "next";

export const metadata: Metadata = { title: "Reset Password" };

type Props = { params: { token: string } };

const ResetPasswordPage = ({ params: { token = "" } }: Props) => (
	<div>{`reset password page - ${token}`}</div>
);

export default ResetPasswordPage;

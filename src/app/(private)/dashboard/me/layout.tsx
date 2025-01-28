import type { Metadata } from "next";

const PAGE_TITLE = "Account Information";
export const metadata: Metadata = { title: PAGE_TITLE };

type Props = { children?: React.ReactNode | undefined };

const AccountInformationLayout = async ({ children }: Props) => (
	<>
		<h1 className="display-4 text-capitalize mb-0">
			<strong>{PAGE_TITLE}</strong>
		</h1>
		{children}
	</>
);

export default AccountInformationLayout;

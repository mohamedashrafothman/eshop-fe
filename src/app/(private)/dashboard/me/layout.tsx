import type { Metadata } from "next";
import Breadcrumb from "views/components/Breadcrumb";

const PAGE_TITLE = "Account Information";
export const metadata: Metadata = { title: PAGE_TITLE };

type Props = { children?: React.ReactNode | undefined };

const AccountInformationLayout = async ({ children }: Props) => (
	<>
		<header>
			<Breadcrumb
				home={{ href: "/dashboard", title: "Dashboard" }}
				items={[{ href: "/dashboard/me", title: PAGE_TITLE }]}
			/>
			<h1 className="text-capitalize mb-0">
				<strong>{PAGE_TITLE}</strong>
			</h1>
		</header>
		{children}
	</>
);

export default AccountInformationLayout;

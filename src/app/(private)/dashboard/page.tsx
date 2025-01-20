import { getSession } from "config/next-auth";
import { Metadata } from "next";
import DashboardSection from "views/sections/DashboardSection";

const PAGE_TITLE = "Dashboard";
export const metadata: Metadata = { title: PAGE_TITLE };

const DashboardHome = async () => {
	const session = await getSession();

	return (
		<>
			<h1 className="text-capitalize mb-0">
				<span className="fs-3">
					<small>Hello, </small>
				</span>
				<strong>{session?.user?.name || ""}</strong>
			</h1>
			<p className="text-secondary">
				Here's a summary of your account activity for this week.
			</p>
			<DashboardSection />
		</>
	);
};

export default DashboardHome;

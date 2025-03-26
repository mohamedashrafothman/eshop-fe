import type { Metadata } from "next";
import Footer from "views/components/Footer";
import Header from "views/components/Header";
import Main from "views/components/Main";
import DashboardSide from "views/sections/DashboardSide";

export const metadata: Metadata = {
	title: { default: "Dashboard", template: "%s | Dashboard | E-Shop" },
};

type Props = { children?: React.ReactNode | undefined };

const DashboardLayout = async ({ children }: Props) => (
	<div className="row mx-0 vh-100 position-relative flex-grow-1">
		<div className="vh-100 top-0 bottom-0 start-0 col-lg-3 col-xxl-2 d-none d-lg-block px-0 py-gutter">
			<DashboardSide />
		</div>
		<div className="col-12 col-lg-9 col-xxl-10 ms-lg-auto ps-lg-0">
			<div className="vstack vh-100 position-relative">
				<Header type="dashboard" />
				<Main className="py-gutter px-4 rounded-4 flex-grow-1 h-100 overflow-auto shadow-sm">
					{children}
				</Main>
				<Footer type="dashboard" className="" />
			</div>
		</div>
	</div>
);

export default DashboardLayout;

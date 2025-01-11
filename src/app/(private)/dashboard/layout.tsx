import type { Metadata } from "next";
import Footer from "views/components/Footer";
import Header from "views/components/Header";
import Main from "views/components/Main";

export const metadata: Metadata = {
	title: { default: "Dashboard", template: "%s | Dashboard | E-Shop" },
};

type Props = { children: React.ReactNode };

const DashboardLayout = async ({ children }: Props) => (
	<div className="row mx-0 vh-100 position-relative flex-grow-1 vh-100">
		<div className="fixed-top vh-100 top-0 bottom-0 start-0 col-lg-3 col-xxl-2 d-none d-lg-block px-0 py-gutter">
			Dashboard Side nav
		</div>
		<div className="col-12 col-lg-9 col-xxl-10 ms-lg-auto">
			<div className="vstack vh-100">
				<Header type="dashboard" className="py-gutter" />
				<Main className="p-gutter rounded-4 flex-grow-1 h-100 overflow-scroll shadow-sm">
					{children}
				</Main>
				<Footer type="dashboard" className="py-gutter" />
			</div>
		</div>
	</div>
);

export default DashboardLayout;

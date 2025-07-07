"use client";

import Logo from "views/components/Logo";
import UserDropdown from "views/components/UserDropdown";
import DashboardSideNav from "views/sections/DashboardSideNav";

const DashboardSide = () => (
	<section className="dashboard-side h-100 w-300px">
		<div className="vstack gap-gutter flex-nowrap h-100">
			<div className="flex-shrink-0 px-gutter py-1">
				<Logo />
			</div>
			<div className="flex-grow-1 overflow-y-auto customized-scroll">
				<DashboardSideNav />
			</div>
			<div className="flex-shrink-0 px-gutter py-1">
				<UserDropdown />
			</div>
		</div>
	</section>
);

export default DashboardSide;

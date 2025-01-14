"use client";

import Logo from "views/components/Logo";
import DashboardSideNav from "views/sections/DashboardSideNav";

const DashboardSide = () => (
	<section className="dashboard-side h-100 overflow-y-auto customized-scroll">
		<div className="vstack gap-gutter flex-nowrap h-100">
			<div className="flex-shrink-0 px-gutter">
				<Logo />
			</div>
			<div className="flex-grow-1">
				<DashboardSideNav />
			</div>
			<div className="flex-shrink-0 px-gutter">
				{/* TODO: Add "need help?" card with contact us link */}
			</div>
		</div>
	</section>
);

export default DashboardSide;

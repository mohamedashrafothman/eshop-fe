"use client";

import FacebookOAuthButton from "views/components/FacebookOAuthButton";
import GoogleOAuthButton from "views/components/GoogleOAuthButton";

const AccountInformationConnections = () => (
	<section className="account-information-connections py-4">
		<div className="row gy-4 gy-xl-0">
			<div className="col-12 col-xl-5 col-3xl-4">
				<div className="row gy-4">
					<div className="col-12">
						<h2 className="h3 text-capitalize">
							<strong>
								<small>Social Connections</small>
							</strong>
						</h2>
					</div>
					<div className="col-12 col-3xl-10">
						<div className="row gy-3">
							<div className="col-12">
								<GoogleOAuthButton className="w-100 justify-content-start" />
							</div>
							<div className="col-12">
								<FacebookOAuthButton className="w-100 justify-content-start" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
);

export default AccountInformationConnections;

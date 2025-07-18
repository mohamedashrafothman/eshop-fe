"use client";

import { default as AccountInformationForm } from "views/forms/AccountInformation";
import { default as AccountPasswordForm } from "views/forms/AccountPassword";

const AccountInformation = () => (
	<section className="account-information py-4">
		<div className="row gy-4 gy-xl-0">
			<div className="col-12 col-xl-6 col-3xl-5 col-ultra-hd-4">
				<div className="vstack gap-3">
					<h2 className="h3 text-capitalize">
						<strong>
							<small>Edit information</small>
						</strong>
					</h2>
					<AccountInformationForm />
				</div>
			</div>
			<div className="col-12 col-xl-1 col-3xl-2 m-0"></div>
			<div className="col-12 col-xl-6 col-3xl-5 col-ultra-hd-4">
				<div className="vstack gap-3">
					<h2 className="h3 text-capitalize">
						<strong>
							<small>Change password</small>
						</strong>
					</h2>
					<AccountPasswordForm />
				</div>
			</div>
		</div>
	</section>
);

export default AccountInformation;

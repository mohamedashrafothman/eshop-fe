"use client";

import { default as UsersForm } from "views/forms/Users";

const UsersStore = () => (
	<section className="users-store py-4">
		<div className="row gy-4 gy-xl-0">
			<div className="col-12 col-xl-6 col-3xl-5 col-ultra-hd-4">
				<div className="vstack gap-3">
					<h2 className="h3 text-capitalize">
						<strong>
							<small>Add new user</small>
						</strong>
					</h2>
					<UsersForm />
				</div>
			</div>
		</div>
	</section>
);

export default UsersStore;

"use client";

import { default as AddressesForm } from "views/forms/Addresses";

const AddressesStore = () => (
	<section className="address-store py-4">
		<div className="row gy-4 gy-xl-0">
			<div className="col-12 col-xl-10 col-3xl-8">
				<div className="vstack gap-3">
					<h2 className="h3 text-capitalize">
						<strong>
							<small>Add new address</small>
						</strong>
					</h2>
					<AddressesForm />
				</div>
			</div>
		</div>
	</section>
);

export default AddressesStore;

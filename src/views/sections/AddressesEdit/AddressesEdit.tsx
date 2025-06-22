"use client";

import { default as AddressForm } from "views/forms/Addresses";

const AddressesEdit = () => (
	<section className="address-edit py-4">
		<div className="row gy-4 gy-xl-0">
			<div className="col-12 col-xl-10 col-3xl-8">
				<div className="vstack gap-3">
					<h2 className="h3 text-capitalize">
						<strong>
							<small>Edit address</small>
						</strong>
					</h2>
					<AddressForm />
				</div>
			</div>
		</div>
	</section>
);

export default AddressesEdit;

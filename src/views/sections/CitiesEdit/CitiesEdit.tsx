"use client";

import { default as CitiesForm } from "views/forms/Cities";

const CitiesEdit = () => (
	<section className="cities-edit py-4">
		<div className="row gy-4 gy-xl-0">
			<div className="col-12 col-xl-5 col-3xl-4">
				<div className="vstack gap-3">
					<h2 className="h3 text-capitalize">
						<strong>
							<small>Edit City</small>
						</strong>
					</h2>
					<CitiesForm />
				</div>
			</div>
		</div>
	</section>
);

export default CitiesEdit;

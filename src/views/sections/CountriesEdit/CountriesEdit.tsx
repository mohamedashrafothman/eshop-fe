"use client";

import { default as CountriesForm } from "views/forms/Countries";

const CountriesEdit = () => (
	<section className="countries-edit py-4">
		<div className="row gy-4 gy-xl-0">
			<div className="col-12 col-xl-5 col-3xl-4">
				<div className="vstack gap-3">
					<h2 className="h3 text-capitalize">
						<strong>
							<small>Edit country</small>
						</strong>
					</h2>
					<CountriesForm />
				</div>
			</div>
		</div>
	</section>
);

export default CountriesEdit;

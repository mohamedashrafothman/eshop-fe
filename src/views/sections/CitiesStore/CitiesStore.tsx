"use client";

import { default as CitiesForm } from "views/forms/Cities";

const CitiesStore = () => (
	<section className="cities-store py-4">
		<div className="row gy-4 gy-xl-0">
			<div className="col-12 col-xl-6 col-3xl-5 col-ultra-hd-4">
				<div className="vstack gap-3">
					<h2 className="h3 text-capitalize">
						<strong>
							<small>Add new city</small>
						</strong>
					</h2>
					<CitiesForm />
				</div>
			</div>
		</div>
	</section>
);

export default CitiesStore;

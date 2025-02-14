"use client";

import { default as BrandsForm } from "views/forms/Brands";

const BrandsEdit = () => (
	<section className="brands-edit py-4">
		<div className="row gy-4 gy-xl-0">
			<div className="col-12 col-xl-5 col-3xl-4">
				<div className="vstack gap-3">
					<h2 className="h3 text-capitalize">
						<strong>
							<small>Edit brand</small>
						</strong>
					</h2>
					<BrandsForm />
				</div>
			</div>
		</div>
	</section>
);

export default BrandsEdit;

"use client";

import { default as CategoriesForm } from "views/forms/Categories";

const CategoriesStore = () => (
	<section className="categories-store py-4">
		<div className="row gy-4 gy-xl-0">
			<div className="col-12 col-xl-5 col-3xl-4">
				<div className="vstack gap-3">
					<h2 className="h3 text-capitalize">
						<strong>
							<small>Add new Category</small>
						</strong>
					</h2>
					<CategoriesForm />
				</div>
			</div>
		</div>
	</section>
);

export default CategoriesStore;

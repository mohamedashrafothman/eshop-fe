"use client";

import { default as ProductsForm } from "views/forms/Products";

const ProductsStore = () => (
	<section className="categories-store py-4">
		<div className="vstack gap-3">
			<h2 className="h3 text-capitalize">
				<strong>
					<small>Add new Product</small>
				</strong>
			</h2>
			<ProductsForm />
		</div>
	</section>
);

export default ProductsStore;

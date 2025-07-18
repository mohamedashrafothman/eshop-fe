"use client";

import { default as ProductsForm } from "views/forms/Products";

const ProductsEdit = () => (
	<section className="products-edit py-4">
		<div className="vstack gap-3">
			<h2 className="h3 text-capitalize">
				<strong>
					<small>Edit Product</small>
				</strong>
			</h2>
			<ProductsForm />
		</div>
	</section>
);

export default ProductsEdit;

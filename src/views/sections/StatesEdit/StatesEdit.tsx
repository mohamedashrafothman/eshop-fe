"use client";

import { default as StatesForm } from "views/forms/States";

const StatesEdit = () => (
	<section className="states-edit py-4">
		<div className="row gy-4 gy-xl-0">
			<div className="col-12 col-xl-5 col-3xl-4">
				<div className="vstack gap-3">
					<h2 className="h3 text-capitalize">
						<strong>
							<small>Edit state</small>
						</strong>
					</h2>
					<StatesForm />
				</div>
			</div>
		</div>
	</section>
);

export default StatesEdit;

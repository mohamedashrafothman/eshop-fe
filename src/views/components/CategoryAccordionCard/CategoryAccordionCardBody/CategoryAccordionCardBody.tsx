"use client";

import useBootstrapCollapse from "hooks/useBootstrapCollapse";
import ICategory from "interfaces/Category.interface";
import { useRef } from "react";
import CategoryAccordionCard from "../CategoryAccordionCard";

type Props = { isLoading?: boolean | undefined; category: ICategory; depth?: number | undefined };

const CategoryAccordionCardBody = ({ category, isLoading, depth }: Props) => {
	// ref hook
	const collapseRef = useRef<HTMLDivElement | null>(null);

	// custom hooks
	useBootstrapCollapse(collapseRef);

	return (
		<div
			id={`categoryAccordionCard${category._id}Collapse`}
			className="accordion-collapse collapse"
			aria-labelledby={`categoryAccordionCard${category._id}Collapse`}
			ref={collapseRef}>
			<div className="card-body ps-1 pt-1 pe-0 pb-0 position-relative">
				<div className="vr position-absolute top-0 start-0 border op-50 h-100 ms-3 z-2"></div>
				{!isLoading &&
					category.children
						.filter((childCategory) => typeof childCategory !== "string")
						.map((childCategory) => (
							<CategoryAccordionCard
								key={childCategory._id}
								category={childCategory}
								isLoading={isLoading}
								depth={(depth || 0) + 1}
								isHasChildren={childCategory.children.length > 0}
							/>
						))}
			</div>
		</div>
	);
};

export default CategoryAccordionCardBody;

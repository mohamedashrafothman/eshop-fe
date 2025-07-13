"use client";

import classNames from "classnames";

type Props = {
	children: React.ReactNode;
	isLoading?: boolean | undefined;
	isHasChildren?: boolean | undefined;
	depth: number;
};

const CategoryAccordionCardWrapper = ({ isLoading, isHasChildren, depth, children }: Props) => (
	<div
		className={classNames("card category-accordion-card", {
			"placeholder-glow": isLoading,
			accordion: isHasChildren,
			"rounded-3": depth === 0,
			"rounded-0": depth > 0,
			"border-0": depth > 0,
			"ps-4": depth > 0,
		})}>
		{children}
	</div>
);

export default CategoryAccordionCardWrapper;

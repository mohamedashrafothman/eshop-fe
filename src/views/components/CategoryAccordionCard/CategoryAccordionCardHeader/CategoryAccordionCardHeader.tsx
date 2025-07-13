"use client";

type Props = { children: React.ReactNode };

const CategoryAccordionCardHeader = ({ children }: Props) => (
	<div className="card-header bg-transparent p-1 border-0 hstack gap-1 flex-nowrap align-items-stretch justify-content-between">
		{children}
	</div>
);

export default CategoryAccordionCardHeader;

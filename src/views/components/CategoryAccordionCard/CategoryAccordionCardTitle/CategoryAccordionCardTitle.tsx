"use client";

import DefaultSrc from "assets/images/default.png";
import ICategory from "interfaces/Category.interface";
import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";

type Props = {
	isLoading?: boolean | undefined;
	isHasChildren?: boolean | undefined;
	category: ICategory;
} & ComponentPropsWithoutRef<"h5">;

const CategoryAccordionCardTitle = ({ isLoading, isHasChildren, category }: Props) => {
	const renderCardTitle = () => (
		<span className="flex-grow-1 hstack gap-2 flex-nowrap align-items-start lh-1 h-100">
			{(isLoading || (typeof category.icon !== "string" && Boolean(category.icon))) && (
				<Image
					src={
						(!isLoading && typeof category.icon !== "string" && category?.icon?.path) ||
						DefaultSrc
					}
					className="w-22px h-22px object-fit-scale-down rounded"
					width="22"
					height="22"
					alt={
						(!isLoading &&
							((typeof category.icon !== "string" && category?.icon?.alt) ||
								category.name)) ||
						""
					}
				/>
			)}
			<span className="flex-grow-1 vstack flex-nowrap">
				{isLoading ? (
					<small className="placeholder placeholder-sm bg-secondary d-block w-75">
						&nbsp;
					</small>
				) : (
					<>
						<strong className="fs-4">
							<small>{category.name}</small>
						</strong>
						<em className="small">
							<small>{`${category.productsCount} products`}</small>
						</em>
					</>
				)}
			</span>
		</span>
	);

	return (
		<h5 className="card-title flex-grow-1 mb-0">
			{!isHasChildren ? (
				renderCardTitle()
			) : (
				<button
					type="button"
					className="accordion-button collapsed text-reset bg-transparent p-1 rounded-1 h-100"
					data-bs-toggle={!isLoading ? "collapse" : undefined}
					data-bs-target={
						!isLoading ? `#categoryAccordionCard${category._id}Collapse` : undefined
					}
					aria-expanded={!isLoading ? "false" : undefined}
					aria-controls={
						!isLoading ? `categoryAccordionCard${category._id}Collapse` : undefined
					}>
					{renderCardTitle()}
				</button>
			)}
		</h5>
	);
};

export default CategoryAccordionCardTitle;

"use client";

import ICategory from "interfaces/Category.interface";
import { ComponentPropsWithoutRef } from "react";
import { pick } from "utils/helpers";
import CategoryAccordionCardBody from "./CategoryAccordionCardBody";
import CategoryAccordionCardCallToActionsGroup from "./CategoryAccordionCardCallToActionsGroup";
import CategoryAccordionCardHeader from "./CategoryAccordionCardHeader";
import CategoryAccordionCardTitle from "./CategoryAccordionCardTitle";
import CategoryAccordionCardWrapper from "./CategoryAccordionCardWrapper";

type Props = (
	| { category: Pick<ICategory, "_id">; isLoading: true }
	| { category: ICategory; isLoading?: false | undefined }
) & {
	depth?: number | undefined;
	isHasChildren?: boolean | undefined;
} & ComponentPropsWithoutRef<"div">;

const CategoryAccordionCard = ({ category, isLoading, depth = 0, isHasChildren }: Props) => (
	<CategoryAccordionCardWrapper isLoading={isLoading} isHasChildren={isHasChildren} depth={depth}>
		<CategoryAccordionCardHeader>
			<CategoryAccordionCardTitle
				isLoading={isLoading}
				isHasChildren={isHasChildren}
				category={category as ICategory}
			/>
			<CategoryAccordionCardCallToActionsGroup
				isLoading={isLoading}
				category={isLoading ? category : pick(category as ICategory, ["_id", "deleted"])}
			/>
		</CategoryAccordionCardHeader>
		{isHasChildren && (
			<CategoryAccordionCardBody
				isLoading={isLoading}
				depth={depth}
				category={category as ICategory}
			/>
		)}
	</CategoryAccordionCardWrapper>
);

export default CategoryAccordionCard;

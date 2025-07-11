"use client";

import ICategory from "interfaces/Category.interface";
import { ComponentPropsWithoutRef } from "react";
import CategoryAccordionCardDeleteCallToAction from "../CategoryAccordionCardDeleteCallToAction";
import CategoryAccordionCardEditCallToAction from "../CategoryAccordionCardEditCallToAction";

type Props = (
	| { isLoading?: false | undefined; category: Pick<ICategory, "_id" | "deleted"> }
	| { isLoading: true; category: Pick<ICategory, "_id"> }
) &
	ComponentPropsWithoutRef<"div">;

const CategoryAccordionCardCallToActionsGroup = (props: Props) => (
	<div className="btn-group p-1 flex-shrink-0">
		<CategoryAccordionCardEditCallToAction {...props} />
		<CategoryAccordionCardDeleteCallToAction {...props} />
	</div>
);

export default CategoryAccordionCardCallToActionsGroup;

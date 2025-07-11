"use client";

import classNames from "classnames";
import ICategory from "interfaces/Category.interface";
import { default as DeleteOrRestoreSingleCategoryModal } from "views/modals/DeleteOrRestoreSingleCategory";

type Props =
	| { isLoading: true; category: Pick<ICategory, "_id"> }
	| { isLoading?: false | undefined; category: Pick<ICategory, "_id" | "deleted"> };

const CategoryAccordionCardDeleteCallToAction = ({ isLoading, category }: Props) => (
	<>
		<button
			type="button"
			data-bs-toggle={!isLoading ? "modal" : undefined}
			data-bs-target={
				!isLoading ? `#deleteOrRestoreSingleCategory${category._id}Modal` : undefined
			}
			className={classNames("btn btn-sm btn-link py-1 px-2 border-0 rounded-2", {
				...(!isLoading
					? {
							"link-primary": category.deleted,
							"link-danger": !category.deleted,
						}
					: {}),
			})}
			title={!isLoading && category.deleted ? "Restore" : "Delete"}
			disabled={isLoading}>
			<svg className="bi w-20px h-20px" height="20" width="20">
				<use href={!isLoading && category.deleted ? "#icon-return" : "#icon-trash"}></use>
			</svg>
		</button>
		{!isLoading && <DeleteOrRestoreSingleCategoryModal category={category} />}
	</>
);

export default CategoryAccordionCardDeleteCallToAction;

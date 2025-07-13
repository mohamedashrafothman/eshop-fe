"use client";

import classNames from "classnames";
import ICategory from "interfaces/Category.interface";
import NextLink from "views/components/NextLink";

type Props = { isLoading?: boolean | undefined; category: Pick<ICategory, "_id"> };

const CategoryAccordionCardEditCallToAction = ({ isLoading, category }: Props) => (
	<NextLink
		href={!isLoading ? `/dashboard/categories/${category._id}/edit` : "#"}
		className={classNames("btn btn-sm btn-link link-primary py-1 px-2 border-0 rounded-2", {
			disabled: isLoading,
		})}
		tabIndex={isLoading ? -1 : undefined}>
		<svg className="bi w-20px h-20px" height="20" width="20">
			<use href="#icon-pencil-square"></use>
		</svg>
	</NextLink>
);

export default CategoryAccordionCardEditCallToAction;

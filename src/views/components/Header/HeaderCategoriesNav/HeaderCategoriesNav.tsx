"use client";

import classNames from "classnames";
import { useCategoriesQuery } from "hooks/useTanstackQuery/useCategories";
import ICategory from "interfaces/Category.interface";
import qs from "qs";
import { Fragment } from "react";
import Dropdown from "views/components/Dropdown";
import Nav, { PROPS_TYPES as NAV_PROPS_TYPES } from "views/components/Nav";

const HeaderCategoriesNav = () => {
	// server state hooks
	const { data: { data: categories = [] } = {}, isLoading: isCategoriesLoading } =
		useCategoriesQuery({ pagination: false, firstLevelOnly: true });

	const renderCategoryNavChildren = ({
		category,
		depth = 0,
	}: {
		category: ICategory;
		depth?: number | undefined;
	}) => (
		<Dropdown as={depth ? Dropdown.MenuItem : Nav.ListItem} direction={depth ? "end" : "down"}>
			<Dropdown.Toggle
				as={depth ? Dropdown.Link : Nav.Link}
				href={`/products?${qs.stringify({ category: category.slug || category._id })}`}
				className={classNames(
					"link-dark text-primary-hover text-primary-focus focus-ring focus-ring-primary text-capitalize",
					{
						"py-12px px-1": depth === 0,
						"icon-link icon-link-hover justify-content-between": depth !== 0,
					}
				)}
				withRotation={depth === 0}>
				<strong>{category.name}</strong>
				<svg className="bi w-22px h-22px text-primary" width="22" height="22">
					<use href={depth ? "#icon-chevron-right" : "#icon-chevron-down"} />
				</svg>
			</Dropdown.Toggle>
			<Dropdown.Menu
				className={classNames("shadow", { "mt-2": depth === 0, "ms-2": depth > 0 })}>
				{category.children
					.filter((child) => typeof child !== "string")
					.map((child) => (
						<Fragment key={child._id}>
							{child.children.length > 0 &&
								renderCategoryNavChildren({
									category: child,
									depth: depth + 1,
								})}
							{child.children.length === 0 && (
								<Dropdown.MenuItem>
									<Dropdown.Link
										href={`/products?${qs.stringify({ category: child.slug || child._id })}`}
										className="link-dark text-primary-hover text-primary-focus focus-ring focus-ring-primary text-capitalize">
										<strong>{child.name}</strong>
									</Dropdown.Link>
								</Dropdown.MenuItem>
							)}
						</Fragment>
					))}
			</Dropdown.Menu>
		</Dropdown>
	);

	return (
		<Nav type={NAV_PROPS_TYPES.CATEGORIES} role="menubar">
			<Nav.List className="text-capitalize">
				{isCategoriesLoading
					? Array.from(
							{ length: 4 },
							(_, i) => ({ _id: String(i) }) as Pick<ICategory, "_id">
						).map((category) => (
							<Fragment key={category._id}>
								<Nav.ListItem className="placeholder-glow">
									<Nav.Link
										href="#"
										className="link-dark text-primary-hover text-primary-focus focus-ring focus-ring-primary text-capitalize py-12px px-1 w-100px disabled"
										tabIndex={-1}>
										<strong className="placeholder placeholder-sm bg-secondary d-block w-75">
											&nbsp;
										</strong>
									</Nav.Link>
								</Nav.ListItem>
							</Fragment>
						))
					: categories.map((category) => (
							<Fragment key={category._id}>
								{category.children.length > 0 &&
									renderCategoryNavChildren({ category })}
								{category.children.length === 0 && (
									<Nav.ListItem>
										<Nav.Link
											href={`/products?${qs.stringify({ category: category.slug || category._id })}`}
											className="link-dark text-primary-hover text-primary-focus focus-ring focus-ring-primary text-capitalize py-12px px-1">
											<strong>{category.name}</strong>
										</Nav.Link>
									</Nav.ListItem>
								)}
							</Fragment>
						))}
			</Nav.List>
		</Nav>
	);
};

export default HeaderCategoriesNav;

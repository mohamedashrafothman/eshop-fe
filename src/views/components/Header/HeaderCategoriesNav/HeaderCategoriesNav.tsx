"use client";

import classNames from "classnames";
import Dropdown from "views/components/Dropdown";
import Nav, { PROPS_TYPES as NAV_PROPS_TYPES } from "views/components/Nav";

const HeaderCategoriesNav = () => {
	// ui
	const renderCategoryChildren = ({ depth = 0 }) => (
		<Dropdown as={depth ? Dropdown.MenuItem : Nav.ListItem} direction={depth ? "end" : "down"}>
			<Dropdown.Toggle
				as={depth ? Dropdown.Link : Nav.Link}
				href="/products?category=women"
				className={classNames(
					"link-dark text-primary-hover text-primary-focus focus-ring focus-ring-primary text-capitalize",
					{
						"py-12px px-1": depth === 0,
						"icon-link icon-link-hover justify-content-between": depth !== 0,
					}
				)}
				role="button"
				data-bs-toggle="dropdown"
				withRotation={depth === 0}>
				<strong>women</strong>
				<svg className="bi w-22px h-22px text-primary" width="22" height="22">
					<use href={depth ? "#icon-chevron-right" : "#icon-chevron-down"} />
				</svg>
			</Dropdown.Toggle>
			<Dropdown.Menu
				className={classNames("shadow", { "mt-2": depth === 0, "ms-2": depth > 0 })}>
				<Dropdown.MenuItem>
					<Dropdown.Link
						href="/test"
						className="link-dark text-primary-hover text-primary-focus focus-ring focus-ring-primary text-capitalize">
						<strong>test</strong>
					</Dropdown.Link>
				</Dropdown.MenuItem>
				{depth < 2 && (
					<>
						<Dropdown.MenuItem isDivider />
						{renderCategoryChildren({ depth: depth + 1 })}
					</>
				)}
			</Dropdown.Menu>
		</Dropdown>
	);

	return (
		<Nav type={NAV_PROPS_TYPES.CATEGORIES} role="menubar">
			<Nav.List className="text-capitalize">
				<Nav.ListItem>
					<Nav.Link
						href="/products?category=men"
						className="link-dark text-primary-hover text-primary-focus focus-ring focus-ring-primary text-capitalize py-12px px-1">
						<strong>men</strong>
					</Nav.Link>
				</Nav.ListItem>
				{renderCategoryChildren({})}
				<Nav.ListItem>
					<Nav.Link
						href="/products?category=kids"
						className="link-dark text-primary-hover text-primary-focus focus-ring focus-ring-primary text-capitalize py-12px px-1">
						<strong>kids</strong>
					</Nav.Link>
				</Nav.ListItem>
			</Nav.List>
		</Nav>
	);
};

export default HeaderCategoriesNav;

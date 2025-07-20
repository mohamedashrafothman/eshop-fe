"use client";

import Nav, { PROPS_TYPES as NAV_PROPS_TYPES } from "views/components/Nav";

const HeaderTopNav = () => (
	<Nav type={NAV_PROPS_TYPES.MENUBAR_TOP} role="menubar">
		<Nav.List className="text-capitalize">
			<Nav.ListItem>
				<Nav.Link href="/contact-us" className="py-1">
					chat with us
				</Nav.Link>
			</Nav.ListItem>
			<Nav.ListItem>
				<Nav.Link
					as="a"
					href="tel:+02 1234 56789"
					className="link-dark text-primary-hover text-primary-focus text-lowercase py-1">
					+02 1234 56789
				</Nav.Link>
			</Nav.ListItem>
			<Nav.ListItem>
				<Nav.Link
					as="a"
					href="mailto:info@eshop.com"
					className="link-dark text-primary-hover text-primary-focus text-lowercase py-1">
					info@eshop.com
				</Nav.Link>
			</Nav.ListItem>
			<Nav.ListItem className="ms-auto">
				<Nav.Link href="/blog" className="py-1">
					blog
				</Nav.Link>
			</Nav.ListItem>
			<Nav.ListItem>
				<Nav.Link href="/about-us" className="py-1">
					about us
				</Nav.Link>
			</Nav.ListItem>
			<Nav.ListItem>
				<Nav.Link href="/careers" className="py-1">
					Careers
				</Nav.Link>
			</Nav.ListItem>
		</Nav.List>
	</Nav>
);

export default HeaderTopNav;

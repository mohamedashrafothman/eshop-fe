import NavLink from "views/components/Nav/NavLink";

type Props = { link: { href: string; title: string } };

const NavListItem = ({ link: { href, title } }: Props) => (
	<li className="nav-item" role="menuitem">
		<NavLink title={title} href={href} />
	</li>
);

export default NavListItem;

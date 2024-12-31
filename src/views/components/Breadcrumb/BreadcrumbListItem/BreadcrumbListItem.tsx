type Props = { children: React.ReactNode; isActive?: boolean | undefined };

const BreadcrumbListItem = ({ children, isActive }: Props) => (
	<li
		className={`breadcrumb-item ${isActive ? "active" : ""}`}
		aria-current={isActive ? "page" : undefined}>
		{children}
	</li>
);

export default BreadcrumbListItem;

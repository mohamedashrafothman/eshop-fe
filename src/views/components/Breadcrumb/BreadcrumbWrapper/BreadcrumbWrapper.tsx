type Props = { children: React.ReactNode };

const BreadcrumbWrapper = ({ children }: Props) => (
	<nav className="py-2" aria-label="breadcrumb">
		{children}
	</nav>
);

export default BreadcrumbWrapper;

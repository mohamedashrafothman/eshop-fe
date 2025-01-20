type Props = { children: React.ReactNode };

const BreadcrumbList = ({ children }: Props) => (
	<ol className="breadcrumb text-capitalize p-0 flex-nowrap">{children}</ol>
);

export default BreadcrumbList;

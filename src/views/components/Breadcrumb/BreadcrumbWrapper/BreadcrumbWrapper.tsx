type Props = { children: React.ReactNode };

const BreadcrumbWrapper = ({ children }: Props) => <nav aria-label="breadcrumb">{children}</nav>;

export default BreadcrumbWrapper;

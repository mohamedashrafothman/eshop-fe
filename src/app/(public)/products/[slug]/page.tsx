import type { Metadata } from "next";

export const metadata: Metadata = { title: "Products Single" };

type Props = { params: { slug: string } };

const ProductsSinglePage = ({ params: { slug = "" } }: Props) => (
	<div>{`products Single page - ${slug}`}</div>
);

export default ProductsSinglePage;

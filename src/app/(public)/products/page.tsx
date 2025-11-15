import { Metadata } from "next";
import { default as ProductsSection } from "views/sections/Products";

const PAGE_TITLE = "Products";
export const metadata: Metadata = { title: PAGE_TITLE };

const ProductsPage = () => <ProductsSection title={PAGE_TITLE} />;

export default ProductsPage;

import IAttachment from "./Attachment.interface";
import IProduct from "./Product.interface";

export default interface Category {
	_id: string;
	name: string;
	slug: string;
	description?: string | undefined;
	icon: IAttachment | string;
	parent: (string | Category)[];
	children: (string | Category)[];
	products: (string | IProduct)[];
	productsCount: number;
	createdAt: string;
	updatedAt: string;
	deleted?: boolean | undefined;
	deletedAt?: Date | undefined;
	deletedBy?: string | undefined;
}

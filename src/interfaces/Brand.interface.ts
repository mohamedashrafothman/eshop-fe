import IAttachment from "./Attachment.interface";
import IProduct from "./Product.interface";

export default interface Brand {
	_id: string;
	name: string;
	slug: string;
	description?: string | undefined;
	logo: IAttachment | string;
	products: (string | IProduct)[];
	productsCount: number;
	createdAt: string;
	updatedAt: string;
	deleted?: boolean | undefined;
	deletedAt?: Date | undefined;
	deletedBy?: string | undefined;
}

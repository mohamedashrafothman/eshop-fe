import vars from "utils/vars";
import IAttachment from "./Attachment.interface";
import IBrand from "./Brand.interface";
import ICategory from "./Category.interface";
import IReview from "./Review.interface";
import IUser from "./User.interface";

export default interface Product {
	_id: string;
	name: string;
	slug: string;
	description: string;
	price: { normal: number; sale?: number | null; discount: number; percentage: number };
	quantity: number;
	colors: { name: string; value: string }[];
	sizes: (typeof vars.products.sizes)[number][];
	images?: (IAttachment | string)[];
	thumbnail: IAttachment | string;
	brand: IBrand | string;
	category: ICategory | string;
	user: IUser | string;
	reviews: (IReview | string)[];
	averageRating: number;
	reviewCount: number;
	isFeatured: boolean;
	createdAt: string;
	updatedAt: string;
	deleted?: boolean | undefined;
	deletedAt?: Date | undefined;
	deletedBy?: string | undefined;
}

import IAddress from "./Address.interface";

export default interface User {
	_id: string;
	email: string;
	name: string;
	slug: string;
	password: string;
	role: string;
	active: boolean;
	emailVerified: boolean;
	google?: string | undefined;
	facebook?: string | undefined;
	addresses: IAddress[] | string[] | [];
	createdAt: string;
	updatedAt: string;
}

import ICountry from "./Country.interface";

export default interface State {
	name: string;
	slug: string;
	code?: string | undefined;
	country: string | ICountry;
	createdAt: string;
	updatedAt: string;
	deleted?: boolean | undefined;
	deletedAt?: Date | undefined;
	deletedBy?: string | undefined;
}

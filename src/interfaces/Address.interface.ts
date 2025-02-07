import ICity from "./City.interface";
import ICountry from "./Country.interface";
import IState from "./State.interface";
import IUser from "./User.interface";

export default interface Address {
	_id: string;
	name: string;
	slug: string;
	street: string;
	building: number;
	floor?: number | undefined;
	apartment?: string | undefined;
	area: string;
	country: string | ICountry;
	state: string | IState;
	city?: string | ICity | undefined;
	zip?: string | undefined;
	default: boolean;
	user: string | IUser;
	createdAt: string;
	updatedAt: string;
	deleted?: boolean | undefined;
	deletedAt?: Date | undefined;
	deletedBy?: string | undefined;
}

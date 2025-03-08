import ICountry from "./Country.interface";
import IState from "./State.interface";

export default interface City {
	_id: string;
	name: string;
	slug: string;
	country: string | ICountry;
	state: string | IState;
	createdAt: string;
	updatedAt: string;
	deleted?: boolean | undefined;
	deletedAt?: Date | undefined;
	deletedBy?: string | undefined;
}

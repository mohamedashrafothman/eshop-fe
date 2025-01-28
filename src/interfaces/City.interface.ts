import ICountry from "./Country.interface";
import IState from "./State.interface";

export default interface City {
	name: string;
	slug: string;
	country: string | ICountry;
	state: string | IState;
	createdAt: string;
	updatedAt: string;
}

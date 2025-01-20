export default interface User {
	_id: string;
	email: string;
	name: string;
	facebook?: string | undefined;
	google?: string | undefined;
}

export default interface Country {
	_id: string;
	name: string;
	slug: string;
	code: string;
	createdAt: string;
	updatedAt: string;
	deleted?: boolean | undefined;
	deletedAt?: Date | undefined;
	deletedBy?: string | undefined;
}

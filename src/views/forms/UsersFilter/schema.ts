import { InferType, number, object, string } from "yup";

const schema = object().shape({
	q: string().optional().trim().nullable(),
	deleted: number().optional().nullable(),
	emailVerified: number().optional().nullable(),
	active: number().optional().nullable(),
	sort: string().optional().nullable(),
});

export type schemaType = InferType<typeof schema>;
export default schema;

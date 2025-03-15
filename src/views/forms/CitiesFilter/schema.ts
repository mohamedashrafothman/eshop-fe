import { InferType, number, object, string } from "yup";

const schema = object().shape({
	q: string().optional().trim().nullable(),
	country: string().optional().nullable(),
	state: string().optional().nullable(),
	deleted: number().optional().nullable(),
	sort: object().optional().nullable(),
	limit: number().optional().nullable(),
});

export type schemaType = InferType<typeof schema>;
export default schema;

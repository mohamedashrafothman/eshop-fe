import { InferType, number, object, string } from "yup";

const schema = object().shape({
	q: string().optional().trim().nullable(),
	deleted: number().optional().nullable(),
	sort: object().optional().nullable(),
	limit: number().optional().nullable(),
});

export type schemaType = InferType<typeof schema>;
export default schema;

import { boolean, InferType, object, string } from "yup";

const schema = object().shape({
	q: string().trim().default(""),
	deleted: boolean().nullable().default(null),
	emailVerified: boolean().nullable().default(null),
	active: boolean().nullable().default(null),
});

export type schemaType = InferType<typeof schema>;
export default schema;

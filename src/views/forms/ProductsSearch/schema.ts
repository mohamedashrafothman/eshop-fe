import { array, InferType, object, string } from "yup";

const schema = object().shape({
	q: string().optional().nullable(),
	categories: array(),
});

export type schemaType = InferType<typeof schema>;
export default schema;

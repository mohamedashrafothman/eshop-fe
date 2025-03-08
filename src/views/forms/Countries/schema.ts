import { InferType, object, string } from "yup";

const schema = object().shape({
	name: string().required("Field required!").max(100),
	code: string().required("Field required!").min(1).max(3),
});

export type schemaType = InferType<typeof schema>;
export default schema;

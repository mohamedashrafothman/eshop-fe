import { InferType, object } from "yup";

const schema = () => object().shape({});

export type schemaType = InferType<ReturnType<typeof schema>>;
export default schema;

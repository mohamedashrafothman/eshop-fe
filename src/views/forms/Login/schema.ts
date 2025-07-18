import { passwordValidation } from "utils/helpers";
import { boolean, InferType, object, string } from "yup";

const schema = () =>
	object().shape({
		email: string().required("Field required!").email(),
		password: string()
			.required("Field required!")
			.test(
				"password",
				"Password must be Between 8 and 64 characters long. contains at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
				passwordValidation
			),
		remember: boolean().optional().default(true),
	});

export type schemaType = InferType<ReturnType<typeof schema>>;
export default schema;

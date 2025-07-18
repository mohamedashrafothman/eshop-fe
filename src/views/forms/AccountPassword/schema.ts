import { passwordValidation } from "utils/helpers";
import { InferType, object, ref, string } from "yup";

const schema = () =>
	object().shape({
		oldPassword: string()
			.required("Field required!")
			.test(
				"oldPassword",
				"Password must be Between 8 and 64 characters long. contains at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
				passwordValidation
			),
		password: string()
			.required("Field required!")
			.test(
				"password",
				"Password must be Between 8 and 64 characters long. contains at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
				passwordValidation
			),
		passwordConfirmation: string()
			.required("Field required!")
			.oneOf([ref("password")], "passwords must match"),
	});

export type schemaType = InferType<ReturnType<typeof schema>>;
export default schema;

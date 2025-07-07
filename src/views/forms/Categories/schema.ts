import { fileFormatValidation, fileSizeValidation } from "utils/helpers";
import vars from "utils/vars";
import { array, InferType, mixed, object, string } from "yup";

const schema = ({ isEdit = false }) =>
	object().shape({
		name: string().required("Field required!").max(100),
		description: string().required("Field required!").max(1000),
		parent: array(),
		icon: mixed().when("isNotEdit", {
			is: !isEdit,
			then: (schema) =>
				schema
					.required("Field required!")
					.test(
						"fileSize",
						`Uploaded file is too big, must be less than ${vars.app.fileMaxSizeInMB}MB`,
						fileSizeValidation
					)
					.test(
						"fileFormat",
						"Uploaded files has unsupported format",
						fileFormatValidation
					),
		}),
	});

export type schemaType = InferType<ReturnType<typeof schema>>;
export default schema;

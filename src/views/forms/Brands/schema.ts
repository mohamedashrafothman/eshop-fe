import { fileFormatValidation, fileSizeValidation } from "utils/helpers";
import vars from "utils/vars";
import { InferType, mixed, object, string } from "yup";

export const NAME_MAX_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 1000;

const schema = ({ isEdit = false }) =>
	object().shape({
		name: string().required("Field required!").max(NAME_MAX_LENGTH),
		description: string().required("Field required!").max(DESCRIPTION_MAX_LENGTH),
		logo: !isEdit
			? mixed()
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
					)
			: mixed().nullable(),
	});

export type schemaType = InferType<ReturnType<typeof schema>>;
export default schema;

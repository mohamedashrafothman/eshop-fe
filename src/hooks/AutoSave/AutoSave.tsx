import { FormikProps, FormikValues } from "formik";
import { useCallback, useEffect, useRef } from "react";
import { isFunction, isSameValueAsInitialValue, omit } from "utils/helpers";

type AutoSaveProps<T extends FormikValues> = {
	delay?: number;
	formik: FormikProps<T>;
	compareAgainstInitialValue?: boolean;
};

function AutoSave<T extends FormikValues>({
	delay = 400,
	formik,
	compareAgainstInitialValue = false,
}: AutoSaveProps<T>) {
	const { values, errors, initialValues, submitForm } = formik;

	const didMountRef = useRef(false);

	const onFormSubmit = useCallback(async () => {
		if (!didMountRef.current) {
			didMountRef.current = true;
			return;
		}

		// Remove fields with errors before submitting
		const cleanValues = omit(values, Object.keys(errors));

		const shouldSubmit =
			isFunction(submitForm) &&
			(!compareAgainstInitialValue || !isSameValueAsInitialValue(cleanValues, initialValues));

		if (shouldSubmit) {
			await submitForm();
		}
	}, [values, errors, submitForm, compareAgainstInitialValue, initialValues]);

	useEffect(() => {
		const timer = setTimeout(onFormSubmit, delay);
		return () => clearTimeout(timer);
	}, [values, errors, delay, onFormSubmit]);

	return null;
}

export default AutoSave;

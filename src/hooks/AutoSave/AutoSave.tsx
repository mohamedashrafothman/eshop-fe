import { useCallback, useEffect, useRef } from "react";
import { isFunction, isSameValueAsInitialValue, omit } from "utils/helpers";

type Props = {
	delay?: number | undefined;
	formik: { [key: string]: any };
	compareAgainstInitialValue?: boolean | undefined;
};

const AutoSave = ({ delay = 400, formik, compareAgainstInitialValue = false }: Props) => {
	const { values, errors, initialValues, submitForm } = formik;

	// ref hooks
	const didMountRef = useRef(false);

	// event handlers
	const onFormSubmit = useCallback(async () => {
		if (!didMountRef?.current) {
			didMountRef.current = true;
			return;
		}
		const v = omit(values, Object.keys(errors));
		if (
			isFunction(submitForm) &&
			(!compareAgainstInitialValue ||
				(compareAgainstInitialValue && !isSameValueAsInitialValue(v, initialValues)))
		)
			submitForm(v);
	}, [values, errors, submitForm, compareAgainstInitialValue, initialValues]);

	// effect hooks
	useEffect(() => {
		const timer = setTimeout(() => onFormSubmit(), delay);
		return () => clearTimeout(timer);
	}, [values, errors, delay, onFormSubmit]);

	return null;
};

export default AutoSave;

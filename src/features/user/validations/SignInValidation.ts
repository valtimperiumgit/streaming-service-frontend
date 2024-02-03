import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required('✖ Email is required.')
        .email('✖ Please enter a valid email address'),
    password: Yup.string()
        .required('✖ Password is required')
        .min(3, "✖ Minimum password length - 3 characters.")
});
import * as Yup from "yup";

export const registrationValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required('✖ Email is required.')
        .email('✖ Please enter a valid email address'),
    password: Yup.string()
        .required('✖ Password is required')
        .min(3, "✖ Minimum password length - 3 characters."),
    name: Yup.string()
        .required('✖ Name is required')
        .min(3, "✖ Minimum name length - 3 characters."),
    age: Yup.number()
        .required('✖ Age is required')
        .min(3, "✖ Minimum age - 3 years old.")
        .max(120, "✖ Max age - 120 years old.")
});
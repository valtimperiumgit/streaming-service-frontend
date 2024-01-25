import "./SignUp.css"
import SignUpHeader from "../../components/sign-up/sign-up-header/SignUpHeader";
import {useState} from "react";
import SignUpRegistrationForm from "../../components/sign-up/sign-up-regform/SignUpRegistrationForm";
import SignUpInfoForm from "../../components/sign-up/sign-up-info-form/SignUpInfoForm";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {RegistrationRequest} from "../../features/user/sign-up/api/SignUpRequests";
import {Sex} from "../../features/user/UserModels";
import {useSelector} from "react-redux";
import {userState} from "../../features/user/store/UserSlice";

const SignUpContentModes = {
    REG_FORM: 'reg-form',
    INFO_FORM: 'info-form'
};

const SignUp = () => {

    const [contentMode, setContentMode] = useState(SignUpContentModes.REG_FORM);

    const handleNextButtonClick = () =>{
        setContentMode(SignUpContentModes.INFO_FORM);
    }

    const registrationValidationSchema = Yup.object().shape({
        email: Yup.string()
            .required('✖ Email is required.')
            .email('✖ Please enter a valid email address'),
        password: Yup.string()
            .required('✖ Password is required')
            .length(4, "✖ Minimum password length - 4 characters."),
    });

    const userSelector = useSelector(userState);

    const registrationFormik= useFormik<RegistrationRequest>({
        initialValues: {
            email: userSelector.userSlice.tempEmail,
            age: 18,
            sex: Sex.NotDefined,
            password: "",
            countryId: 1,
        },
        validationSchema: registrationValidationSchema,
        onSubmit: values => {
            console.log("Success submit")
            console.log(values)
        },
    });

    return (
        <div className="sign-up">
            <SignUpHeader />
            <form onSubmit={registrationFormik.handleSubmit} className="sing-up-content">

                {contentMode === SignUpContentModes.REG_FORM &&
                    <SignUpRegistrationForm
                    formikValues={registrationFormik.values}
                    formikHandleChange={registrationFormik.handleChange}
                    nextButtonClick={handleNextButtonClick}
                    formikErrors={registrationFormik.errors}
                    formikTouched={registrationFormik.touched}
                    formikHandleBlur={registrationFormik.handleBlur}/>}

                {contentMode === SignUpContentModes.INFO_FORM &&
                    <SignUpInfoForm
                    formikValues={registrationFormik.values}
                    formikHandleChange={registrationFormik.handleChange}
                    backToPreviousStep={() => {setContentMode(SignUpContentModes.REG_FORM)}}/>}
            </form>
        </div>
    );
};

export default SignUp;
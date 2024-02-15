import "./SignUp.css"
import SignUpHeader from "../../components/sign-up/sign-up-header/SignUpHeader";
import {useEffect, useState} from "react";
import SignUpRegistrationForm from "../../components/sign-up/sign-up-regform/SignUpRegistrationForm";
import SignUpInfoForm from "../../components/sign-up/sign-up-info-form/SignUpInfoForm";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {SignUpRequest} from "../../features/user/api/UserRequests";
import {Sex} from "../../features/user/UserModels";
import {useDispatch, useSelector} from "react-redux";
import {registrationAsyncThunk, userState} from "../../features/user/store/UserSlice";
import {registrationValidationSchema} from "../../features/user/validations/SignUpValidation";
import {AppDispatch} from "../../store/Store";
import {getCountriesAsyncThunk} from "../../features/countries/store/CountriesSlice";
import {useNavigate} from "react-router-dom";
import {checkUserExistingByEmail} from "../../features/user/api/UserService";

const SignUpContentModes = {
    REG_FORM: 'reg-form',
    INFO_FORM: 'info-form'
};

const SignUp = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCountriesAsyncThunk());
    }, [dispatch])

    const [contentMode, setContentMode] = useState(SignUpContentModes.REG_FORM);

    const [isAccountAlreadyExist, setIsAccountAlreadyExist] = useState(false);

    const handleNextButtonClick = () =>{
        checkUserExistingByEmail(registrationFormik.values.email)
            .then((res) => {
                if(res?.data.value === false)
                {
                    setContentMode(SignUpContentModes.INFO_FORM);
                }
                else if(res?.data.value === true)
                {
                    setIsAccountAlreadyExist(true);
                }
            })

    }

    const userSlice = useSelector(userState);

    const registrationFormik= useFormik<SignUpRequest>({
        initialValues: {
            email: userSlice.tempEmail,
            name: "",
            age: 18,
            sex: Sex.NotDefined,
            password: "",
            countryId: 1,
        },
        validationSchema: registrationValidationSchema,
        onSubmit: values => {

            const transformedValues = {
                ...values,
                sex: Number(values.sex),
                countryId: Number(values.countryId)
            };

            dispatch(registrationAsyncThunk(transformedValues)).then(() => navigate("/browse/movies"));
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
                    formikHandleBlur={registrationFormik.handleBlur}
                    isAccountAlreadyExist={isAccountAlreadyExist}/>}

                {contentMode === SignUpContentModes.INFO_FORM &&
                    <SignUpInfoForm
                    formikValues={registrationFormik.values}
                    formikHandleChange={registrationFormik.handleChange}
                    formikErrors={registrationFormik.errors}
                    formikTouched={registrationFormik.touched}
                    formikHandleBlur={registrationFormik.handleBlur}
                    backToPreviousStep={() => {setContentMode(SignUpContentModes.REG_FORM)}}/>}
            </form>
        </div>
    );
};

export default SignUp;
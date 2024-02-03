import "./SignUpRegistrationForm.css"
import {SignUpRequest} from "../../../features/user/api/UserRequests";
import {ChangeEventHandler} from "react";
import {FormikErrors, FormikHandlers, FormikTouched} from "formik";

interface SignUpRegistrationFormProps{
    nextButtonClick: () => void
    formikHandleChange: ChangeEventHandler;
    formikValues: SignUpRequest;
    formikErrors: FormikErrors<SignUpRequest>;
    formikTouched: FormikTouched<SignUpRequest>;
    formikHandleBlur: FormikHandlers['handleBlur'];
    isAccountAlreadyExist: boolean;
}

const SignUpRegistrationForm = (props: SignUpRegistrationFormProps) => {

    let isExistErrors = !!((props.formikErrors.email) || (props.formikErrors.password));

    return (
        <div className="sign-up-regform">
            {props.isAccountAlreadyExist && <div  className="sign-up-regform-server-error">
                <span className="sign-up-regform-server-error-bold"> Looks like that account already exists. </span> Sign into that account or try using a different email.
            </div>}

            <div className="sign-up-regform-steps"> STEP 1 OF 2</div>
            <div className="sign-up-regform-title"> Create a account to start.</div>
            <div className="sign-up-regform-text"> Just a few more steps and you're done!</div>
            <div className="sign-up-regform-text"> We hate paperwork, too.</div>

            <div className="sign-up-regform-active-content">
                <input
                    className="sign-up-regform-input"
                    id="email"
                    name="email"
                    onChange={props.formikHandleChange}
                    onBlur={props.formikHandleBlur}
                    value={props.formikValues.email}
                    type="text"
                    placeholder="Email"/>

                {props.formikTouched.email && props.formikErrors.email
                    && <div className="sign-up-regform-error"> {props.formikErrors.email} </div>}

                <input
                    className="sign-up-regform-input"
                    id="password"
                    name="password"
                    onChange={props.formikHandleChange}
                    value={props.formikValues.password}
                    onBlur={props.formikHandleBlur}
                    type="password"
                    placeholder="Password"/>

                {props.formikTouched.password && props.formikErrors.password
                    && <div className="sign-up-regform-error"> {props.formikErrors.password} </div>}

                <button
                    disabled={isExistErrors}
                    className= {isExistErrors ? "sign-up-regform-button-disabled" : "sign-up-regform-button"}
                    type="button"
                    onClick={props.nextButtonClick}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default SignUpRegistrationForm;
import "./SignUpInfoForm.css"
import React, {ChangeEventHandler} from "react";
import {SignUpRequest} from "../../../features/user/api/UserRequests";
import {Sex} from "../../../features/user/UserModels";
import { useSelector} from "react-redux";
import {countriesState, getCountriesAsyncThunk} from "../../../features/countries/store/CountriesSlice";
import {FormikErrors, FormikHandlers, FormikTouched} from "formik";
import {number} from "yup";

interface SignUpInfoFormProps{
    formikHandleChange: ChangeEventHandler;
    formikValues: SignUpRequest;
    backToPreviousStep: () => void;
    formikErrors: FormikErrors<SignUpRequest>;
    formikTouched: FormikTouched<SignUpRequest>;
    formikHandleBlur: FormikHandlers['handleBlur'];
}

const SignUpInfoForm = (props: SignUpInfoFormProps) => {

    let countries = useSelector(countriesState).countries;

    const renderCountries = () =>{
        return countries.map((country) =>
            <option key={country.id} value={country.id}> {country.name} </option>
        )
    }

    let isExistErrors = !!((props.formikErrors.name) || (props.formikErrors.age));

    return (
        <div className="sign-up-info-form">

            <div className="sign-up-info-steps"> STEP 2 OF 2</div>
            <div className="sign-up-info-title"> There's just a little bit left.</div>
            <div className="sign-up-info-text"> Tell us about yourself so we can recommend content based on your preferences.</div>

            <div className="sign-up-info-form-active-content">
                <input
                    placeholder="Name"
                    id="name"
                    name="name"
                    onChange={props.formikHandleChange}
                    onBlur={props.formikHandleBlur}
                    value={props.formikValues.name}
                    type="text"/>

                {props.formikTouched.name && props.formikErrors.name
                    && <div className="sign-up-regform-error"> {props.formikErrors.name} </div>}

                <input
                    onChange={props.formikHandleChange}
                    onBlur={props.formikHandleBlur}
                    value={props.formikValues.age}
                    placeholder="Age"
                    id="age"
                    name="age"
                    type="number"/>

                {props.formikTouched.age && props.formikErrors.age
                    && <div className="sign-up-regform-error"> {props.formikErrors.age} </div>}

                <div>
                    <select
                        onChange={props.formikHandleChange}
                        onBlur={props.formikHandleBlur}
                        value={props.formikValues.sex}
                        name="sex"
                        id="sex"
                        className="sign-up-info-form-select"
                        style={{marginRight: "12px"}}>
                            <option key={Sex.Male} value={Sex.Male}> Male </option>
                            <option key={Sex.Female} value={Sex.Female}> Female </option>
                            <option key={Sex.NotDefined} value={Sex.NotDefined}> NotDefined </option>
                    </select>

                    <select
                        onChange={props.formikHandleChange}
                        onBlur={props.formikHandleBlur}
                        value={props.formikValues.countryId}
                        name="countryId"
                        id="countryId"
                        className="sign-up-info-form-select">
                            {renderCountries()}
                    </select>
                </div>
            </div>

            <div className="sign-up-info-form-buttons">
                <button
                    disabled={isExistErrors}
                    type="submit"
                    className= {isExistErrors ? "sign-up-info-form-buttons-submit-button-disabled" : "sign-up-info-form-buttons-submit-button"}>
                        Submit
                </button>

                <button
                    onClick={props.backToPreviousStep}
                    className="sign-up-info-form-buttons-previous-button">
                        Previous
                </button>
            </div>
        </div>
    );
};

export default SignUpInfoForm;
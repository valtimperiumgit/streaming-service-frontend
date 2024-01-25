import "./SignUpInfoForm.css"
import {ChangeEventHandler} from "react";
import {RegistrationRequest} from "../../../features/user/sign-up/api/SignUpRequests";
import {Sex} from "../../../features/user/UserModels";

interface SignUpInfoFormProps{
    formikHandleChange: ChangeEventHandler;
    formikValues: RegistrationRequest;
    backToPreviousStep: () => void;
}

const SignUpInfoForm = (props: SignUpInfoFormProps) => {
    return (
        <div className="sign-up-info-form">
            <input placeholder="Name" id="name" name="name" type="text"/>
            <input placeholder="Age" id="age" name="age" type="number"/>

            <div>
                <select name="sex" id="sex">
                    <option key={Sex.Male} value={Sex.Male}> Male </option>
                    <option key={Sex.Female} value={Sex.Female}> Female </option>
                    <option key={Sex.NotDefined} value={Sex.NotDefined}> NotDefined </option>
                </select>

                <select name="" id="">
                </select>
            </div>

            <div className="sign-up-info-form-buttons">
                <button type="submit" className="sign-up-info-form-buttons-submit-button"> Submit </button>
                <button onClick={props.backToPreviousStep} className="sign-up-info-form-buttons-previous-button"> Previous </button>
            </div>
        </div>
    );
};

export default SignUpInfoForm;
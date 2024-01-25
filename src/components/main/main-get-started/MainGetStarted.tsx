import "../main-get-started/MainGetStarted.css"
import MainButton from "../ui/main-button/MainButton";
import {useRef, useState} from "react";
import {AppDispatch} from "../../../store/Store";
import { useDispatch } from "react-redux";
import {setTempEmail} from "../../../features/user/store/UserSlice";
import {useNavigate} from "react-router-dom";

const MainGetStarted = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const validateEmail = (email: string) => {
        if (!email || email.length < 3) {
            return "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            return "Please enter a valid email address";
        }
        return "";
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        if (error) {
            setError(validateEmail(event.target.value));
        }
    };

    const handleButtonClick = () => {
        const validationResult = validateEmail(email);
        setError(validationResult);

        if (validationResult && inputRef.current) {
            inputRef.current.focus();
        }
        else{
            dispatch(setTempEmail(email));
            navigate("/signup");
        }
    };

    return (
        <div className="main-get-started">
            <div className="main-get-started-title">
                Unlimited movies and TV shows!
            </div>
            <div className="main-get-started-text">
                Ready to watch? Enter your email to create account.
            </div>

            <div className="main-get-started-form">
                <div>
                    <input
                        onChange={handleInputChange}
                        ref={inputRef}
                        className={error ? "main-get-started-input-with-error" : "main-get-started-input"}
                        value={email}
                        placeholder={"Email address"}
                        type="text"/>
                    {error && <div className="main-get-started-form-error-message"> ✖ {error} </div>}
                </div>

                <MainButton
                    onClick={handleButtonClick}
                    fontSize={"1.5rem"}
                    fontWeight={"500"}
                    width={"202px"}
                    height={"55px"}
                    text={"Get Started"}/>
            </div>
        </div>
    );
};

export default MainGetStarted;
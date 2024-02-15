import "./SignInForm.css"
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {SignInRequest} from "../../../features/user/api/UserRequests";
import {loginValidationSchema} from "../../../features/user/validations/SignInValidation";
import {loginAsyncThunk, refreshLoginError, userState} from "../../../features/user/store/UserSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store/Store";
import {useEffect} from "react";

const SignInForm = () => {

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(refreshLoginError());
    }, [dispatch]);

    const loginFormik= useFormik<SignInRequest>({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginValidationSchema,
        onSubmit: values => {
            dispatch(loginAsyncThunk(values))
                .then((res) => {
                    if(res.meta.requestStatus !== "rejected"){
                        navigate("/browse/movies");
                    }
                })
        },
    });

    let loginError = useSelector(userState).loginError;

    return (
        <div className="sign-in-form">
            <form onSubmit={loginFormik.handleSubmit} className="sign-in-form-content">
                <div className="sign-in-form-title">
                    Sign in
                </div>

                {loginError !== null && <div className="sign-in-api-error">
                    {loginError}
                </div>}

                <input
                    className="sign-in-form-input"
                    id="email"
                    name="email"
                    onChange={loginFormik.handleChange}
                    placeholder="Email"
                    type="text"
                    value={loginFormik.values.email}
                    onBlur={loginFormik.handleBlur}/>

                {loginFormik.touched.email && loginFormik.errors.email
                    && <div className="sign-in-error"> {loginFormik.errors.email} </div>}

                <input
                    className="sign-in-form-input"
                    placeholder="Password"
                    type="text"
                    id="password"
                    name="password"
                    value={loginFormik.values.password}
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}/>

                {loginFormik.touched.password && loginFormik.errors.password
                    && <div className="sign-in-error"> {loginFormik.errors.password} </div>}

                <button type="submit" className="sign-in-form-button">
                    Sign in
                </button>

                <div className="sign-in-form-sign-up-link">
                    Now here? <Link className="sign-in-form-sign-up-link-active" to="/signup"> Sign up now. </Link>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
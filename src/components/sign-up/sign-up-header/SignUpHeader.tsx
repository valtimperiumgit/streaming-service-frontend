import "./SignUpHeader.css"
import {Link} from "react-router-dom";

const SignUpHeader = () => {
    return (
        <div className="sign-up-header">
            <div className="sign-up-header-logo-container">
                <img width="80" height="60" src="/images/watch-movie.png" alt=""/>
            </div>
            
            <div className="sign-up-header-sign-in-button-container">
                <Link className="sign-up-header-sign-in-button" to={"/signin"}> Sing In </Link>
            </div>
        </div>
    );
};

export default SignUpHeader;
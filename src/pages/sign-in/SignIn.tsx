import './SignIn.css'
import SignInHeader from "../../components/sign-in/sign-in-header/SignInHeader";
import SignInForm from "../../components/sign-in/sign-in-form/SignInForm";

const SingIn = () => {
    const bannerPath = "/images/UA-en-20240115-popsignuptwoweeks-perspective_alpha_website_large.jpg";

    return (
        <div className="sign-in">
            <img className="sign-in-banner" src={bannerPath} alt=""/>
            <div className="sign-in-first-screen">
                <SignInHeader/>
                <SignInForm/>
            </div>
        </div>
    );
};

export default SingIn;
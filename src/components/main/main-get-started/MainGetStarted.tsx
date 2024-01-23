import "../main-get-started/MainGetStarted.css"
import MainButton from "../ui/main-button/MainButton";

const MainGetStarted = () => {
    return (
        <div className="main-get-started">
            <div className="main-get-started-title">
                Unlimited movies and TV shows!
            </div>
            <div className="main-get-started-text">
                Ready to watch? Enter your email to create account.
            </div>

            <div className="main-get-started-form">
                <input className="main-get-started-input" placeholder={"Email address"} type="text"/>
                <MainButton fontSize={"1.5rem"} fontWeight={"500"} width={"202px"} height={"55px"} text={"Get Started"} />
            </div>
        </div>
    );
};

export default MainGetStarted;
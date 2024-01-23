import MainHeader from "../../components/main/main-header/MainHeader";
import MainGetStarted from "../../components/main/main-get-started/MainGetStarted";
import "../main/Main.css"
import MainWelcomePreview from "../../components/main/main-welcome-preview/MainWelcomePreview";
import MainFooter from "../../components/main/main-footer/MainFooter";

const Main = () => {
    const bannerPath = "/images/UA-en-20240115-popsignuptwoweeks-perspective_alpha_website_large.jpg";

    return (
        <div className="main">
            <img className="main-banner" src={bannerPath} alt=""/>
            <div className="main-first-screen">
                <MainHeader/>
                <MainGetStarted/>
            </div>
            <MainWelcomePreview/>
            <MainFooter/>
        </div>
    );
};

export default Main;
import "../main-header/MainHeader.css"
import MainButton from "../ui/main-button/MainButton";

const MainHeader = () => {
    return (
        <div className="main-header">
            <div className="main-header-logo-container"> <img width="128" height="82" src="/images/watch-movie.png" alt=""/> </div>

            <div className="main-header-sign-in-button-container">
                <MainButton fontSize={""} fontWeight={"500"} height={"31px"} width={"75px"} text={"Sign In"}/>
            </div>
        </div>
    );
};

export default MainHeader;
import "../main-header/MainHeader.css"
import MainButton from "../ui/main-button/MainButton";
import {useNavigate} from "react-router-dom";

const MainHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="main-header">
            <div className="main-header-logo-container"> <img width="128" height="82" src="/images/watch-movie.png" alt=""/> </div>

            <div className="main-header-sign-in-button-container">
                <MainButton onClick={() => { navigate("/signin") }} fontSize={""} fontWeight={"500"} height={"31px"} width={"75px"} text={"Sign In"}/>
            </div>
        </div>
    );
};

export default MainHeader;
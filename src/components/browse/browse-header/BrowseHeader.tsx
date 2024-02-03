import "./BrowseHeader.css"
import BrowseHeaderNavigationItem from "./browse-header-navigation-item/BrowseHeaderNavigationItem";
import {useSelector} from "react-redux";
import {userState} from "../../../features/user/store/UserSlice";
import {useEffect, useState} from "react";

const BrowseHeader = () => {
    let user = useSelector(userState).user;

    const [isHeaderOnTop, setIsHeaderOnTop] = useState(true);

    useEffect(() => {
        const onScroll = () => {
            setIsHeaderOnTop(window.scrollY < 50);
        };

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <div className={ isHeaderOnTop ? "browse-header-on-top" : "browse-header" }>
            <div className="browse-header-logo">
                <img src="/images/watch-movie.png" width="60.5px" height="34.6px" alt=""/>
            </div>

            <div className="browse-header-navigator">
                <BrowseHeaderNavigationItem text="Home" isActive={true} navigatePath="/browse"/>
                <BrowseHeaderNavigationItem text="Movies" isActive={false} navigatePath="/browse/movies"/>
                <BrowseHeaderNavigationItem text="Tv Shows" isActive={false} navigatePath="/browse/tv-shows"/>
                <BrowseHeaderNavigationItem text="New" isActive={false} navigatePath="/browse"/>
                <BrowseHeaderNavigationItem text="My List" isActive={false} navigatePath="/browse"/>
            </div>

            <div className="browse-header-profile-panel">
                <img src={user !== undefined? user.profileImageUrl : "/images/watch-movie.png"} width="32px" height="32px" style={{objectFit: "cover"}} alt=""/>
            </div>
        </div>
    );
};

export default BrowseHeader;
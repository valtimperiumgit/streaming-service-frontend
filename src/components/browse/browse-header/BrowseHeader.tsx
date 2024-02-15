import "./BrowseHeader.css"
import BrowseHeaderNavigationItem from "./browse-header-navigation-item/BrowseHeaderNavigationItem";
import {useSelector} from "react-redux";
import {userState} from "../../../features/user/store/UserSlice";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const BrowseHeader = () => {
    const navigate = useNavigate();
    let user = useSelector(userState).user;

    const searchInputRef = useRef<HTMLInputElement>(null)

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
                <BrowseHeaderNavigationItem text="Movies" isActive={false} navigatePath="/browse/movies"/>
                <BrowseHeaderNavigationItem text="Tv Shows" isActive={false} navigatePath="/browse/tv-shows"/>
                <BrowseHeaderNavigationItem text="New" isActive={false} navigatePath="/browse"/>
                <BrowseHeaderNavigationItem text="My List" isActive={false} navigatePath="/browse/my-list"/>
            </div>

            <div className="browse-header-search">
                <input ref={searchInputRef} placeholder={"Titles, actors, genres"} className="browse-header-search-input" type="text"/>
                <img onClick={() => {
                        if (searchInputRef.current) {
                            navigate("/browse/searched-content", {state: { query: searchInputRef.current.value}})
                        }
                }
            }
                     style={{marginLeft: "10px", cursor: "pointer"}} width="24px" height="24px" src="/images/search-magnifier-symbol-of-interface.png" alt=""/>
            </div>
            
            <div className="browse-header-profile-panel">
                <img src={user !== undefined? user.profileImageUrl : "/images/watch-movie.png"} width="32px" height="32px" style={{objectFit: "cover"}} alt=""/>
            </div>
        </div>
    );
};

export default BrowseHeader;
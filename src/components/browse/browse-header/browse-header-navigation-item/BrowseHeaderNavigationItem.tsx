import "./BrowseHeaderNavigationItem.css"
import {useNavigate} from "react-router-dom";

interface BrowseHeaderNavigationItemProps {
    text: string;
    isActive: boolean;
    navigatePath: string;
}

const BrowseHeaderNavigationItem = (props: BrowseHeaderNavigationItemProps) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => {navigate(props.navigatePath)}} className={props.isActive ? "browse-header-navigation-item-active" : "browse-header-navigation-item" }>
            {props.text}
        </div>
    );
};

export default BrowseHeaderNavigationItem;
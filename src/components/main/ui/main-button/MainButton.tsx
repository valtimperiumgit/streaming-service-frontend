import "../main-button/MainButton.css"

interface MainButtonProps{
    width: string;
    height: string;
    text: string;
    fontWeight: string;
    fontSize: string;
    onClick?: () => void;
}

const MainButton = (props: MainButtonProps) => {

    let style = {width: props.width, height: props.height, fontWeight: props.fontWeight, fontSize: props.fontSize};

    return (
        <button onClick={props.onClick} className="main-button" style={style}>
            {props.text}
        </button>
    );
};

export default MainButton;
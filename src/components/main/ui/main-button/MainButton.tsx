import "../main-button/MainButton.css"

interface MainButtonProps{
    width: string;
    height: string;
    text: string;
    fontWeight: string;
    fontSize: string;
}

const MainButton = (props: MainButtonProps) => {

    let style = {width: props.width, height: props.height, fontWeight: props.fontWeight, fontSize: props.fontSize};

    return (
        <button className="main-button" style={style}>
            {props.text}
        </button>
    );
};

export default MainButton;
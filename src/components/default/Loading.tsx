import "./Loading.css"
import {ClipLoader} from "react-spinners";

const Loading = () => {
    return (
        <div className="loading">
            <div>
                <ClipLoader
                    color="red"
                    loading={true}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    );
};

export default Loading;
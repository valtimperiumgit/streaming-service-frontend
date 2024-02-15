import {useEffect, useRef, useState} from "react";
import './TopPagePlayer.css'
import {useNavigate} from "react-router-dom";
import movies from "../../../../pages/movies/Movies";

interface TopPagePlayerProps {
    videoUrl: string;
    logoUrl: string;
    autoPlay?: boolean;
    controls?: boolean;
    posterUrl: string;
    info: () => void;
    maturityRating: number;
    isInfoModalOpen: boolean;
    movieId: string;
}

const TopPagePlayer = (props: TopPagePlayerProps) => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const [muted, setMuted] = useState(true);
    const navigate = useNavigate();

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setMuted(videoRef.current.muted);
        }
    };

    const [videoSource, setVideoSource] = useState<string>(props.videoUrl);

    useEffect(() => {
        if(props.isInfoModalOpen){
            setVideoSource(props.posterUrl);
        }
        else{
            setVideoSource(props.videoUrl);
        }
    }, [props.isInfoModalOpen]);

    const handleVideoEnd = () => {
        setVideoSource(props.posterUrl);
    };

    return (
        <div className="top-page-player">
            <video
                ref={videoRef}
                src={videoSource}
                poster={props.posterUrl}
                autoPlay={props.autoPlay}
                controls={props.controls}
                muted={true}
                onEnded={handleVideoEnd}
                className="top-page-player-video"
                style={{
                    objectFit: "cover",
                    width: '100vw',
                    height: '100vh'
                }}/>
            <div className="top-page-player-gradient"></div>

            <img width="300px" height="150px" className="top-page-player-logo" src={props.logoUrl} alt=""/>

            <div className="top-page-player-actions-container">

                <div className="top-page-player-left-actions">
                    <div onClick={() => {navigate("watch", {state: {movieId: props.movieId, watchedTime: localStorage.getItem(props.movieId || "")}})}} className="top-page-player-play">
                        <img className="top-page-player-icon" src="/images/play-button.png" width="30px" height="30px"
                             alt=""/> Play
                    </div>
                    <div onClick={props.info} className="top-page-player-info">
                        <img className="top-page-player-icon" src="/images/information.png" width="30px" height="30px"
                             alt=""/> More Info
                    </div>
                </div>

                <div className="top-page-player-right-actions">
                    <button className="top-page-player-volume-button" onClick={toggleMute}>
                        <img width="26px" height="26px" src={muted ? "/images/mute.png" : "/images/volume-down.png"}
                             alt=""/>
                    </button>
                    <div className="top-page-player-right-actions-maturity-rating">
                        {props.maturityRating}+
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopPagePlayer;
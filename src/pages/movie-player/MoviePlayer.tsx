import "./MoviePlayer.css"
import {ChangeEvent, useEffect, useRef, useState} from "react";
import ReactPlayer from "react-player";
import {useDispatch, useSelector} from "react-redux";
import {getMovieAsyncThunk, moviesState} from "../../features/movies/store/MoviesSlice";
import Slider from 'react-slider';
import {useLocation} from "react-router-dom";
import {AppDispatch} from "../../store/Store";
import {number} from "yup";

const MoviePlayer = ( ) => {
    const dispatch: AppDispatch = useDispatch();
    let movie = useSelector(moviesState).movieForWatching;
    const [playing, setPlaying] = useState(true);
    const [volume, setVolume] = useState(0.8);
    const playerRef = useRef<ReactPlayer>(null);
    const [played, setPlayed] = useState<number>(0); // Для отслеживания прогресса видео
    const [duration, setDuration] = useState<number>(movie?.duration !== undefined ? movie?.duration * 60 : 200);
    const playerWrapperRef = useRef<HTMLDivElement>(null); // Добавляем реф для контейнера

    const playedRef = useRef(played);
    const durationRef = useRef(duration);

    const location = useLocation();

    useEffect(() => {
        dispatch(getMovieAsyncThunk(location?.state.movieId));
        console.log(location?.state.watchedTime)

        if (playerRef.current) {
            playerRef.current.seekTo(location?.state.watchedTime, 'seconds');
        }

        return () => {
            localStorage.setItem(location?.state.movieId, (playedRef.current * durationRef.current).toString())
        };
    }, [location.state]);

    useEffect(() => {
        playedRef.current = played; // Обновляем ref при изменении played
    }, [played]);

    useEffect(() => {
        durationRef.current = duration; // Обновляем ref при изменении played
    }, [duration]);

    const togglePlayPause = () => {
        setPlaying(!playing);
    };

    const skipForward = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10, 'seconds');
        }
    };

    const skipBackward = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10, 'seconds');
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(e.target.value));
    };

    const toggleFullScreen = () => {
        if (document.fullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        } else if (playerWrapperRef.current) {
            if (playerWrapperRef.current.requestFullscreen) {
                playerWrapperRef.current.requestFullscreen();
            }
        }
    };

    const handleProgress = (progress: { played: number; playedSeconds: number }) => {
        setPlayed(progress.played);
    };

    const handleDuration = (duration: number) => {
        setDuration(duration);
    };

    const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setPlayed(newTime);
        if (playerRef.current) {
            playerRef.current.seekTo(newTime * duration, 'fraction');
        }
    };

    const formatTime = (seconds: number) => {
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = pad(date.getUTCSeconds());
        if (hh) {
            return `${hh}:${pad(mm)}:${ss}`;
        }
        return `${mm}:${ss}`;
    };

    const pad = (string: number) => {
        return ('0' + string).slice(-2);
    };

    return (
        <div className="player-wrapper" ref={playerWrapperRef}>
            <ReactPlayer
                ref={playerRef}
                className="react-player"
                width="100%"
                height="100%"
                url={movie?.videoUrl}
                playing={playing}
                volume={volume}
                controls={false}
                onProgress={handleProgress}
                onDuration={handleDuration}
            />
            <div className="controls-overlay">

                <Slider
                    min={0}
                    max={duration}
                    step={0.01}
                    value={played * duration}
                    onBeforeChange={() => setPlaying(false)}
                    onChange={(value: number | number[] | null | undefined) => {
                        if (typeof value === 'number') {
                            setPlayed(value / duration); // Обновляем played в соответствии с продолжительностью
                        }
                    }}
                    onAfterChange={(value: number | number[] | null | undefined) => {
                        if (typeof value === 'number' && playerRef.current) {
                            playerRef.current.seekTo(value, 'seconds');
                            setPlaying(true);
                        }
                    }}
                    className="seek-slider"
                    thumbClassName="thumb"
                    trackClassName="track"
                />

                <div className="time-display">
                    {formatTime(played * duration)} / {formatTime(duration)}
                </div>

                <div className="controls-overlay-container">
                    <div className="controls-overlay-left">
                        <div className="controls-overlay-left-control" onClick={togglePlayPause}>{playing ?
                            <img width="40px" height="40px" src="/images/pause%20(1).png" alt=""/> :
                            <img width="40px" height="40px" src="/images/play.png" alt=""/>}
                        </div>

                        <div className="controls-overlay-left-control" onClick={skipBackward}>
                            <img src="/images/back.png" width="55px" height="55px" alt=""/>
                        </div>

                        <div className="controls-overlay-left-control" onClick={skipForward}>
                            <img src="/images/next.png" width="55px" height="55px" alt=""/>
                        </div>

                        <input className="volume" type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange}/>

                    </div>

                    <div className="controls-overlay-right">
                        <div onClick={toggleFullScreen}><img src="/images/expand.png" width="40px" height="40px"
                                                             alt=""/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MoviePlayer;
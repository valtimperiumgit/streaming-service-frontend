import './MovieInfoModal.css'
import {useEffect, useState} from "react";
import {getLikePercentage} from "../../../../features/movies/MoviesService";
import {Creator} from "../../../../features/creators/CreatorsModels";
import {Genre} from "../../../../features/genres/GenresModels";
import {Actor} from "../../../../features/actors/ActorsModels";
import {
    addMovieToMyListAsyncThunk,
    dislikeMovieAsyncThunk,
    likeMovieAsyncThunk,
    moviesState,
    removeMovieFromMyListAsyncThunk
} from "../../../../features/movies/store/MoviesSlice";
import {AppDispatch} from "../../../../store/Store";
import {useDispatch, useSelector} from "react-redux";

interface MovieInfoModalProps{
    close: () => void;
}

const MovieInfoModal = (props: MovieInfoModalProps) => {
    const dispatch: AppDispatch = useDispatch();
    let movie = useSelector(moviesState).movieForInfo;
    const [videoSource, setVideoSource] = useState<string>(movie?.trailerUrl || "");
    const [likePercentage, setLikePercentage] = useState<number>(100);
    const year = movie !== undefined ? new Date(movie.releaseDate).getFullYear() : new Date().getFullYear();

    useEffect(() => {
        document.body.classList.add('no-scroll');

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    useEffect(() => {
        if(movie){
            getLikePercentage(movie?.id).then(res => { setLikePercentage(res?.data !== undefined ? res.data : 55) })
        }
    }, [movie]);

    const handleVideoEnd = () => {
        setVideoSource(movie?.imageUrl || "");
    };

    const renderMovieProperties = (data: Actor[] | Genre[] | Creator[] ) => {
        if(movie !== undefined) {
            const dataLength = data.length;
            return data.map((item, index) => {
                const separator = index === dataLength - 1 ? '.' : ', ';
                return <span key={item.id}>{item.name}{separator}</span>;
            })
        }
    }

    const handleMyListClick = () => {
        if(movie !== undefined)
        {
            movie.isExistInUserList ?
                dispatch(removeMovieFromMyListAsyncThunk(movie.id)) :
                dispatch(addMovieToMyListAsyncThunk(movie.id));
        }
    }

    return (
        <div className="movie-info-modal-overlay">
            <div className="movie-info-modal">
                <div onClick={props.close} className="movie-info-modal-close-button">
                    <img width="18px" height="18px" src="/images/close.png" alt=""/>
                </div>

                <video
                    src={videoSource}
                    poster={movie?.imageUrl}
                    autoPlay={true}
                    controls={false}
                    muted={true}
                    onEnded={handleVideoEnd}
                    style={{
                        objectFit: "cover",
                        width: '930px',
                        height: '500px'
                    }}/>

                <div className="movie-info-modal-second-part">
                    <img width="300px" height="150px" className="movie-info-modal-logo"
                         src={movie?.logoUrl}
                         alt=""/>

                    <div className="movie-info-modal-actions">
                        <div className="movie-info-modal-actions-play">
                            <img className="movie-info-modal-icon" width="30px" height="30px"
                                 src="/images/play-button.png"
                                 alt=""/> Play
                        </div>

                        <div onClick={handleMyListClick}
                            className="movie-info-modal-actions-button">
                            <img className="movie-info-modal-actions-button-icon" width="26px" height="26px"
                                 src={ movie?.isExistInUserList ? "/images/tick.png" : "/images/plus.png"} alt=""/>
                        </div>

                        <div onClick={()=> {dispatch(likeMovieAsyncThunk(movie?.id || ""))}} className={movie?.isLiked ? "movie-info-modal-actions-button-liked" : "movie-info-modal-actions-button"}>
                            <img className="movie-info-modal-actions-button-icon" width="21px" height="21px"
                                 style={{paddingBottom: "5px"}} src={movie?.isLiked ? "/images/like-green.png" : "/images/like.png"} alt=""/>
                        </div>

                        <div onClick={()=> {dispatch(dislikeMovieAsyncThunk(movie?.id || ""))}} className={movie?.isDisliked ? "movie-info-modal-actions-button-disliked" : "movie-info-modal-actions-button"}>
                            <img className="movie-info-modal-actions-button-icon-dislike" width="21px" height="21px"
                                 style={{paddingBottom: "5px"}} src={movie?.isDisliked ? "/images/dislike-red.png" : "/images/dislike.png"} alt=""/>
                        </div>
                    </div>


                    <div className="movie-info-modal-main-info">
                        <div className="movie-info-modal-main-info-left">
                            <div className="movie-info-modal-main-info-left-number-info">
                                <div className="movie-info-modal-main-info-left-number-info-match"> {likePercentage}% Liked</div>
                                <div className="movie-info-modal-main-info-left-number-info-numbers"> {year} </div>
                                <div className="movie-info-modal-main-info-left-number-info-numbers"> {movie?.duration || 0}m </div>
                                <div className="movie-info-modal-main-info-left-number-info-m-rating"> {movie?.maturityRating || 0}+ </div>
                            </div>
                            <div className="movie-info-modal-main-info-left-description">
                                {movie?.description}
                            </div>
                        </div>

                        <div className="movie-info-modal-main-info-right">
                            <div className="movie-info-modal-main-right-section"><span
                                className="movie-info-modal-main-right-title"> Cast: </span> {renderMovieProperties(movie?.movieActors || [])}
                            </div>
                            <div className="movie-info-modal-main-right-section"><span
                                className="movie-info-modal-main-right-title"> Genres: </span> {renderMovieProperties(movie?.movieGenres || [])}
                            </div>
                            <div className="movie-info-modal-main-right-section"><span
                                className="movie-info-modal-main-right-title"> Creators: </span> {renderMovieProperties(movie?.movieCreators || [])}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MovieInfoModal;
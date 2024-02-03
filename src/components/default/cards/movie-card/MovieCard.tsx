import {useEffect, useState} from "react";
import "./MovieCard.css"
import {
    addMovieToMyListAsyncThunk,
    dislikeMovieAsyncThunk,
    likeMovieAsyncThunk, moviesState, removeMovieFromMyListAsyncThunk,
    setMovieForInfo
} from "../../../../features/movies/store/MoviesSlice";
import {AppDispatch} from "../../../../store/Store";
import {useDispatch, useSelector} from "react-redux";
import {Movie} from "../../../../features/movies/MoviesModels";
import {getLikePercentage} from "../../../../features/movies/MoviesService";
import {Genre} from "../../../../features/genres/GenresModels";

interface MovieCardProps{
    movie?: Movie
}

const MovieCard = (props: MovieCardProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const movie = useSelector(moviesState).movieForInfo;
    const [likePercentage, setLikePercentage] = useState<number>(100);
    const year = movie !== undefined ? new Date(movie.releaseDate).getFullYear() : new Date().getFullYear();

    useEffect(() => {
        if(movie){
            getLikePercentage(movie?.id).then(res => { setLikePercentage(res?.data !== undefined ? res.data : 55) })
        }
    }, [movie]);

    const handleMyListClick = () => {
        if(movie !== undefined)
        {
            movie.isExistInUserList ?
                dispatch(removeMovieFromMyListAsyncThunk(movie.id)) :
                dispatch(addMovieToMyListAsyncThunk(movie.id));
        }
    }

    const renderMovieGenres = (data: Genre[]) => {
        if (data !== undefined) {
            // Получаем первые три элемента или все, если их меньше трех
            const firstThreeData = data.slice(0, 3);
            const dataLength = firstThreeData.length;

            return firstThreeData.map((item, index) => {
                return <span style={{marginRight: "12px"}} key={item.id}>{item.name}</span>;
            });
        }
    }

    return (
        <div
            onMouseEnter={() => { setIsHovered(true); dispatch(setMovieForInfo(props.movie)) }}
            onMouseLeave={() => setIsHovered(false)}
            style={{position: 'relative'}}
            className="movie-card"
        >
            <img className="movie-card-preview" src="/images/watch-movie.png" alt={""}/>

            {isHovered && (  <div className="movie-card-info">
                <img src={movie?.imageUrl}
                     style={{width: "100%", height: "154px", objectFit: "cover"}} alt={""}/>

                <div className="movie-card-info-actions">
                    <div className="movie-card-info-actions-left">

                        <div className="movie-card-info-actions-left-play">
                            <img className="movie-card-info-actions-icon" width="30px" height="30px"
                                 src="/images/play-button.png"
                                 alt=""/>
                        </div>

                        <div onClick={handleMyListClick}
                             className="movie-info-modal-actions-button">
                            <img className="movie-info-modal-actions-button-icon" width="26px" height="26px"
                                 src={movie?.isExistInUserList ? "/images/tick.png" : "/images/plus.png"} alt=""/>
                        </div>

                        <div onClick={() => {
                            dispatch(likeMovieAsyncThunk(movie?.id || ""))
                        }}
                             className={movie?.isLiked ? "movie-info-modal-actions-button-liked" : "movie-info-modal-actions-button"}>
                            <img className="movie-info-modal-actions-button-icon" width="21px" height="21px"
                                 style={{paddingBottom: "5px"}}
                                 src={movie?.isLiked ? "/images/like-green.png" : "/images/like.png"} alt=""/>
                        </div>

                        <div onClick={() => {
                            dispatch(dislikeMovieAsyncThunk(movie?.id || ""))
                        }}
                             className={movie?.isDisliked ? "movie-info-modal-actions-button-disliked" : "movie-info-modal-actions-button"}>
                            <img className="movie-info-modal-actions-button-icon-dislike" width="21px" height="21px"
                                 style={{paddingBottom: "5px"}}
                                 src={movie?.isDisliked ? "/images/dislike-red.png" : "/images/dislike.png"} alt=""/>
                        </div>
                    </div>

                    <div className="movie-card-info-actions-right">
                        <div onClick={handleMyListClick}
                             className="movie-info-modal-actions-button">
                            <img className="movie-info-modal-actions-button-icon" width="26px" height="26px"
                                 src={movie?.isExistInUserList ? "/images/tick.png" : "/images/plus.png"} alt=""/>
                        </div>
                    </div>
                </div>

                <div className="movie-card-info-number-info">
                    <div className="movie-info-modal-main-info-left-number-info-match"> {likePercentage}% Liked</div>
                    <div className="movie-info-modal-main-info-left-number-info-numbers"> {year} </div>
                    <div className="movie-info-modal-main-info-left-number-info-numbers"> {movie?.duration || 0}m</div>
                    <div
                        className="movie-info-modal-main-info-left-number-info-m-rating" style={{color: "white"}}> {movie?.maturityRating || 0}+
                    </div>
                </div>

                <div className="movie-card-info-genres">
                    {renderMovieGenres(movie?.movieGenres || [])}
                </div>
            </div>)}
        </div>
    );
};

export default MovieCard;
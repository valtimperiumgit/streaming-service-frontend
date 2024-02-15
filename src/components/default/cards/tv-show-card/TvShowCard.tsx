import {useEffect, useState} from "react";
import "./TvShowCard.css"
import {
    addMovieToMyListAsyncThunk,
    dislikeMovieAsyncThunk,
    likeMovieAsyncThunk, moviesState, removeMovieFromMyListAsyncThunk,
    setMovieForInfo
} from "../../../../features/movies/store/MoviesSlice";
import {AppDispatch} from "../../../../store/Store";
import {useDispatch, useSelector} from "react-redux";
import {Genre} from "../../../../features/genres/GenresModels";
import {useNavigate} from "react-router-dom";
import {TvShow} from "../../../../features/tv-shows/TvShowsModels";
import {
    addTvShowToMyListAsyncThunk, dislikeTvShowAsyncThunk, likeTvShowAsyncThunk,
    removeTvShowFromMyListAsyncThunk, setTvShowForInfo,
    tvShowsState
} from "../../../../features/tv-shows/store/TvShowsSlice";
import {getTvShowLikePercentage} from "../../../../features/tv-shows/TvShowsService";

interface TvShowCardProps{
    tvShow?: TvShow
    onHoverAction: Function,
    openInfo: () => void
}

const TvShowCard = (props: TvShowCardProps) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const tvShow = useSelector(tvShowsState).tvShowsForInfo;
    const [likePercentage, setLikePercentage] = useState<number>(100);
    const year = tvShow !== undefined ? new Date(tvShow.releaseDate).getFullYear() : new Date().getFullYear();

    useEffect(() => {
        if(tvShow){
            getTvShowLikePercentage(tvShow?.id).then(res => { setLikePercentage(res?.data !== undefined ? res.data : 55) })
        }
    }, [tvShow]);

    const handleMyListClick = () => {
        if(tvShow !== undefined)
        {
            tvShow.isExistInUserList ?
                dispatch(removeTvShowFromMyListAsyncThunk(tvShow.id)) :
                dispatch(addTvShowToMyListAsyncThunk(tvShow.id));
        }
    }

    const renderTvShowGenres = (data: Genre[]) => {
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
            onMouseEnter={() => {
                setIsHovered(true);
                dispatch(setTvShowForInfo(props.tvShow))
                props.onHoverAction(true);
            }}
            onMouseLeave={() => {setIsHovered(false); props.onHoverAction(false); }}
            style={{position: 'relative'}}
            className="movie-card"
        >

            <div style={{ position: "relative", zIndex: "77"}}>
                <img className="movie-card-preview" src={props.tvShow?.imageUrl} alt={""}/>
                <img className="movie-card-preview-logo" src={props.tvShow?.logoUrl} alt={""}/>
            </div>


            <div className={isHovered ? 'movie-card-info movie-card-info-enter-active' : 'movie-card-info'}>

                <video
                    src={tvShow?.trailerUrl}
                    poster={tvShow?.imageUrl}
                    autoPlay={true}
                    controls={false}
                    muted={true}
                    style={{width: "100%", height: "154px", objectFit: "cover"}}/>

                <div className="movie-card-info-actions">
                    <div className="movie-card-info-actions-left">

                        <div onClick={handleMyListClick}
                             className="movie-info-modal-actions-button">
                            <img className="movie-info-modal-actions-button-icon" width="26px" height="26px"
                                 src={tvShow?.isExistInUserList ? "/images/tick.png" : "/images/plus.png"} alt=""/>
                        </div>

                        <div onClick={() => {
                            dispatch(likeTvShowAsyncThunk(tvShow?.id || ""))
                        }}
                             className={tvShow?.isLiked ? "movie-info-modal-actions-button-liked" : "movie-info-modal-actions-button"}>
                            <img className="movie-info-modal-actions-button-icon" width="21px" height="21px"
                                 style={{paddingBottom: "5px"}}
                                 src={tvShow?.isLiked ? "/images/like-green.png" : "/images/like.png"} alt=""/>
                        </div>

                        <div onClick={() => {
                            dispatch(dislikeTvShowAsyncThunk(tvShow?.id || ""))
                        }}
                             className={tvShow?.isDisliked ? "movie-info-modal-actions-button-disliked" : "movie-info-modal-actions-button"}>
                            <img className="movie-info-modal-actions-button-icon-dislike" width="21px" height="21px"
                                 style={{paddingBottom: "5px"}}
                                 src={tvShow?.isDisliked ? "/images/dislike-red.png" : "/images/dislike.png"} alt=""/>
                        </div>
                    </div>

                    <div className="movie-card-info-actions-right">
                        <div onClick={props.openInfo}
                             className="movie-info-modal-actions-button">
                            <img className="movie-info-modal-actions-button-icon-arrow" width="26px" height="26px"
                                 src="/images/arrow-down-sign-to-navigate.png" alt=""/>
                        </div>
                    </div>
                </div>

                <div className="movie-card-info-number-info">
                    <div className="movie-info-modal-main-info-left-number-info-match"> {likePercentage}% Liked</div>
                    <div className="movie-info-modal-main-info-left-number-info-numbers"> {year} </div>
                    <div
                        className="movie-info-modal-main-info-left-number-info-m-rating"
                        style={{color: "white"}}> {tvShow?.maturityRating || 0}+
                    </div>
                </div>

                <div className="movie-card-info-genres">
                    {renderTvShowGenres(tvShow?.tvShowGenres || [])}
                </div>
            </div>
        </div>
    );
};

export default TvShowCard;
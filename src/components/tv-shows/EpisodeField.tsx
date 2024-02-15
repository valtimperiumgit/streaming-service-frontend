import {Episode} from "../../features/tv-shows/TvShowsModels";
import './EpisodeField.css'

interface EpisodeFieldProps{
    episode: Episode;
    onClick: Function;
}

const EpisodeField = (props: EpisodeFieldProps) => {


    return (
        <div className="episode-field" onClick={() => props.onClick()}>
            <div className="episode-field-number">
                {props.episode.number}
            </div>

            <img className="episode-image" src="/images/play.png" alt=""/>

            <div className="episode-field-title">
                {props.episode.title}
            </div>

            <div className="episode-field-duration">
                {props.episode.duration}m
            </div>
        </div>
    );
};

export default EpisodeField;
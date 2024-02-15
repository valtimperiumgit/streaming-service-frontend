import {Genre} from "../genres/GenresModels";
import {Actor} from "../actors/ActorsModels";
import {Creator} from "../creators/CreatorsModels";

export interface TvShow{
    id: string;
    title: string;
    trailerUrl: string;
    imageUrl: string;
    logoUrl: string;
    isLiked: boolean;
    isDisliked: boolean;
    maturityRating: number;
    description: string;
    releaseDate: string;
    tvShowGenres: Genre[],
    tvShowActors: Actor[],
    tvShowCreators: Creator[],
    seasons: Season[],
    isExistInUserList: boolean
}

export interface Season{
    id: string;
    title: string;
    number: number;
    episodes: Episode[]
}

export interface Episode{
    id: string;
    title: string;
    number: number;
    videoUrl: string;
    duration: number;
}
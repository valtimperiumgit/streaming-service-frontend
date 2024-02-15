import authorizedAxiosInstance from "../../api/AuthorizedAxiosInstance";
import {API_URL} from "../../enviroment";
import axios, {AxiosError} from "axios";
import {ErrorResponse} from "../shared/ErrorResponse";
import {Episode, TvShow} from "./TvShowsModels";

export const getTvShows = async () => {
    try {
        let response = await authorizedAxiosInstance.get<TvShow[]>(`${API_URL}/api/tv-shows`);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                throw Error(axiosError.response.data.detail);
            }
        }
    }
}

export const getTvShow = async (tvShowId: string) => {
    try {
        const params = {
            tvShowId: tvShowId
        }

        let response = await authorizedAxiosInstance.get<TvShow>(`${API_URL}/api/tv-shows/accurate`, {params});
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                throw Error(axiosError.response.data.detail);
            }
        }
    }
}

export const getEpisode = async (episodeId: string) => {
    try {
        const params = {
            episodeId: episodeId
        }

        let response = await authorizedAxiosInstance.get<Episode>(`${API_URL}/api/tv-shows/episode`, {params});
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                throw Error(axiosError.response.data.detail);
            }
        }
    }
}

export const likeTvShow = async (tvShowId: string) => {
    try {
        const params = {
            tvShowId: tvShowId
        }

        return await authorizedAxiosInstance.post<TvShow>(`${API_URL}/api/tv-shows/like`, {},{params});
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                throw Error(axiosError.response.data.detail);
            }
        }
    }
}

export const dislikeTvShow = async (tvShowId: string) => {
    try {
        const params = {
            tvShowId: tvShowId
        }

        return await authorizedAxiosInstance.post<TvShow>(`${API_URL}/api/tv-shows/dislike`, {},{params});
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                throw Error(axiosError.response.data.detail);
            }
        }
    }
}

export const getTvShowLikePercentage = async (tvShowId: string) => {
    try {
        const params = {
            tvShowId: tvShowId
        };

        return await authorizedAxiosInstance.get<number>(`${API_URL}/api/tv-shows/match`, {params});
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                console.log(axiosError)
            }
        }
    }
}
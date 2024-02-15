import authorizedAxiosInstance from "../../api/AuthorizedAxiosInstance";
import {Movie} from "../movies/MoviesModels";
import {API_URL} from "../../enviroment";
import axios, {AxiosError} from "axios";
import {ErrorResponse} from "../shared/ErrorResponse";
import {SearchContentResponse} from "./SearchModels";

export const searchContent = async (query: string) => {
    try {
        const params = {
            query: query
        }

        let response = await authorizedAxiosInstance.get<SearchContentResponse>(`${API_URL}/api/search`, {params});
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
import {Country, getCountriesQuery} from "../../countries/CountriesModels";
import unauthorizedAxiosInstance from "../../../api/UnauthorizedAxiosInstance";
import {API_URL} from "../../../enviroment";
import {Genre, getGenresQuery} from "../GenresModels";

export interface GraphQlGenresResponse{
    data: { genres: Genre[] }
}

export const getGenres = async () => {
    try {
        return await unauthorizedAxiosInstance.post<GraphQlGenresResponse>(`${API_URL}/graphql`, {query: getGenresQuery});
    }
    catch (error) {
        console.error('Error GraphQL:', error);
    }
}
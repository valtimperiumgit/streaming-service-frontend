import unauthorizedAxiosInstance from "../../../api/UnauthorizedAxiosInstance";
import {API_URL} from "../../../enviroment";
import {getCountriesQuery} from "../CountriesModels";
import {GraphQlCountriesResponse} from "./CountriesResponses";

export const getCountries = async () => {
    try {
        return await unauthorizedAxiosInstance.post<GraphQlCountriesResponse>(`${API_URL}/graphql`, {query: getCountriesQuery});
    }
    catch (error) {
        console.error('Error GraphQL:', error);
    }
}
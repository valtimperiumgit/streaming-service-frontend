import unauthorizedAxiosInstance from "../../api/UnauthorizedAxiosInstance";
import {API_URL} from "../../enviroment";
import {getCountriesQuery} from "./CountriesModels";

export const getCountries = async () => {
    try {
        return await unauthorizedAxiosInstance.post(`${API_URL}/graphql`, {query: getCountriesQuery});
    }
    catch (error) {
        console.error('Error GraphQL:', error);
    }
}
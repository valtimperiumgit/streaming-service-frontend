import {Country} from "../CountriesModels";

export interface GraphQlCountriesResponse{
    data: { countries: Country[] }
}
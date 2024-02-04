import axios from "axios"

import * as Types from '../../utils/types'

const CountryService = {
    /**
     * Retrieves all Countries asynchronously.
     * @returns {Array<Types.Country>}
     */
    GetAllCountries: async () => {
        let result = '';
        await axios.get(import.meta.env.VITE_API_COUNTRY_BURL)
            .then(value => {
                result = value.data;
            })
            .catch(error =>
                console.log(error))
        return result;
    },
    /**
     * Retrieves country by Id.
     * @param {number} id 
     * @returns {Types.Country} The retrieved country
     */
    GetCountryById: async (id) => {
        let result = '';
        await axios.get(import.meta.env.VITE_API_COUNTRY_BURL + id)
            .then(value => {
                result = value.data;
            })
            .catch(error =>
                console.log(error))
        return result;
    },
    /**
     * Adds a new country asynchronously
     * @param {Types.AddCountryRequestParam} country 
     * @returns {Types.Country} The newly added country
     */
    AddCountry: async (country) => {
        let result = '';
        await axios.post(import.meta.env.VITE_API_COUNTRY_BURL, country)
            .then(value => {
                result = value.data;
            })
            .catch(error =>
                console.log(error))
        return result;
    },
    /**
     * Deletes country by id asynchronously
     * @param {number} id 
     * @returns 
     */
    delete: async (id) => {
        let result = '';
        await axios.del(import.meta.env.VITE_API_COUNTRY_BURL + id)
            .then(value => {
                result = value.data;
            })
            .catch(error =>
                console.log(error))
        return result;
    },
}

export default CountryService;
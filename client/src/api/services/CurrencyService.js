import axios from "axios"

// eslint-disable-next-line no-unused-vars
import * as Types from '../../utils/types'

const CurrencyService = {
    /**
     * Retrieves all currencies asynchronously.
     * @returns {Array<Types.Currency>}
     */
    GetAllCurrencies: async () => {
        let result = '';
        await axios.get(import.meta.env.VITE_API_CURRENCY_BURL)
            .then(value => {
                result = value.data;
            })
            .catch(error =>
                console.log(error))
        return result;
    },
    /**
     * Retrieves currency by Id.
     * @param {number} id 
     * @returns The retrieved currency
     */
    GetCurrencyById: async (id) => {
        let result = '';
        await axios.get(import.meta.env.VITE_API_CURRENCY_BURL + id)
            .then(value => {
                result = value.data;
            })
            .catch(error =>
                console.log(error))
        return result;
    },
    /**
     * Adds a new currency asynchronously
     * @param {Types.AddCurrencyRequestParam} currency 
     * @returns The newly added currency
     */
    AddCurrency: async (currency) => {
        let result = '';
        await axios.post(import.meta.env.VITE_API_CURRENCY_BURL, currency)
            .then(value => {
                result = value.data;
            })
            .catch(error =>
                console.log(error))
        return result;
    },
    /**
     * Updates a currency asynchronously
     * @param {Types.UpdateCurrencyRequestParam} currency 
     * @returns {Types.Currency} The updated currency.
     */
    update: async (currency) => {
        let result = '';
        await axios.put(import.meta.env.VITE_API_CURRENCY_BURL + currency.id + "/" + currency.NewRate)
            .then(value => {
                result = value.data;
            })
            .catch(error =>
                console.log(error))
        return result;
    },
    /**
     * Deletes currency by id asynchronously
     * @param {number} id 
     * @returns 
     */
    delete: async (id) => {
        let result = '';
        await axios.put(import.meta.env.VITE_API_CURRENCY_BURL + id)
            .then(value => {
                result = value.data;
            })
            .catch(error =>
                console.log(error))
        return result;
    },
}

export default CurrencyService;
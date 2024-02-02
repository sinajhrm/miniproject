import axios from "axios"

const CurrencyService = {
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
}

export default CurrencyService;
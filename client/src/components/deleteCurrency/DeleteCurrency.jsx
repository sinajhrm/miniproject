// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import './DeleteCurrency.css'
import * as Types from '../../utils/types'
import CurrencyService from "../../api/services/CurrencyService";

/**
 * 
 * @param {Types.DeleteCurrencyProps} props 
 */
export default function DeleteCurrency(props) {

    const [selectedCurrencyId, setSelectedCurrencyId] = useState(-1);

    const handleSelectedCurrencyIdChange = (chosenCurrencyId) => {
        setSelectedCurrencyId(Number(chosenCurrencyId));
    };

    async function handleOnBtnDelete() {
        if (selectedCurrencyId > 0) {
            await CurrencyService.delete(selectedCurrencyId);
            props.currenciesUpdateTrigger(true);
        }
    }

    return (<>
        <div className="divDeleteCurrency">
            <select onChange={(e) => handleSelectedCurrencyIdChange(e.target.value)} required>
                <option value={0}>Select a currency ...</option>
                {props.available_currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                        {currency.currencyCode + " | " + currency.conversionRate}
                    </option>
                ))}
            </select>
            <button onClick={handleOnBtnDelete}>Delete</button>
        </div>
    </>)
}

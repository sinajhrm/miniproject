// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import './UpdateCurrency.css'
import * as Types from '../../utils/types'
import CurrencyService from "../../api/services/CurrencyService";

/**
 * 
 * @param {Types.UpdateCurrencyProps} props  
 */
export default function UpdateCurrency(props) {

    const [selectedCurrencyId, setSelectedCurrencyId] = useState(-1);
    const [newConversionRate, setNewConversionRate] = useState(0);

    const handleSelectedCurrencyIdChange = (chosenCurrencyId) => {
        setSelectedCurrencyId(Number(chosenCurrencyId));
    };

    /**
     * 
     * @param {HTMLInputElement} numberInputElem 
     */
    function handleChangeConversionRate(numberInputElem) {
        setNewConversionRate(Number(numberInputElem.value) > 0 ? Number(numberInputElem.value) : 0.001);
    }

    async function handleUpdateCurrency() {
        console.log(await CurrencyService.update({ id: selectedCurrencyId, newRate: newConversionRate }))
        props.currenciesUpdateTrigger(true);
    }

    return (<>
        <div className="divUpdateCurrency">
            <select onChange={(e) => handleSelectedCurrencyIdChange(e.target.value)} required>
                <option value={0}>Select a currency ...</option>
                {props.available_currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                        {currency.currencyCode + " | " + currency.conversionRate}
                    </option>
                ))}
            </select>
            <input type="number" step={0.001} min={0.001} placeholder="New conversion rate" onChange={(e) => handleChangeConversionRate(e.target)} required />
            <button onClick={handleUpdateCurrency}>Update</button>
        </div>
    </>)
}
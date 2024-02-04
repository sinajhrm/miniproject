import React, { useState } from "react";
import './AddCurrency.css'
import * as Types from '../../utils/types'
import CurrencyService from "../../api/services/CurrencyService";

/**
 * 
 * @param {Types.AddCurrencyProps} props
 */
export default function AddCurrency(props) {

    const [selectedCountryId, setSelectedCountryId] = useState(-1);
    const [currencyCode, setCurrencyCode] = useState('');
    const [conversionRate, setConversionRate] = useState(0);


    function handleSelectedCountryIdChange(chosenCurrencyId) {
        setSelectedCountryId(Number(chosenCurrencyId));
    }

    function handleCurrencyCodeChange(inputCurrencyCode) {
        setCurrencyCode(inputCurrencyCode);
    }

    /**
     * 
     * @param {HTMLInputElement} numberInputElem 
     */
    function handleChangeConversionRate(numberInputElem) {
        setConversionRate(Number(numberInputElem.value) > 0 ? Number(numberInputElem.value) : 0.001);
    }

    async function handleOnBtnAddCurrency() {
        if (selectedCountryId > 0 && conversionRate > 0 && currencyCode !== '') {
            console.log({
                countryId: selectedCountryId,
                conversionRate: conversionRate,
                currencyCode: currencyCode
            })
            await CurrencyService.AddCurrency(
                {
                    countryId: selectedCountryId,
                    conversionRate: conversionRate,
                    currencyCode: currencyCode
                }
            );
            props.currenciesUpdateTrigger(true);
        }
    }

    return (<>
        <div className="divAddCurrency">
            <div>
                <select onChange={(e) => handleSelectedCountryIdChange(e.target.value)} required>
                    <option value={0}>Select a country ...</option>
                    {props.available_countries.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>
                <input name="currency_code" type="text" placeholder="Currency Code" onChange={(e) => { handleCurrencyCodeChange(e.target.value) }} />
                <input
                    placeholder="Conversion Rate"
                    type="number"
                    min={0.001}
                    step={0.001}
                    onChange={(e) => handleChangeConversionRate(e.target)} />
            </div>
            <button onClick={handleOnBtnAddCurrency}>Add Currency</button>
        </div>
    </>)
}
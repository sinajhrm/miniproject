import React, { useState } from "react"
// process.env.NODE_ENV !== 'test' ? '' : import './ConvertCurrency.css'
import * as Types from '../../utils/types'


/**
 * 
 * @param {Types.ConvertCurrencyProps} props 
 */
export default function ConvertCurrency(props) {

    const [conversionRate, setConversionRate] = useState(0);
    const [conversionAmount, setConversionAmount] = useState(0);
    const [conversionResult, setConversionResult] = useState(-1);

    const handleConversionRateChange = (selectedConversionRate) => {
        setConversionRate(selectedConversionRate);
    };

    const handleOnBtnConvertClick = () => {
        setConversionResult(
            props.currencyConvertCallback(
                { conversionRate: conversionRate },
                { conversionRate: 1 },
                conversionAmount))
    }

    return (<>
        <div className="divConvertCurrency">
            <select id="cbxCurrencyOptions" className="filter-category-button" onChange={(e) => handleConversionRateChange(e.target.value)}>
                <option value={0}>Select a currency ...</option>
                {props.available_currencies.map((currency) => (
                    <option key={currency.id} value={currency.conversionRate}>
                        {currency.currencyCode}
                    </option>
                ))}
            </select>
            <input id="txtAmount" type="number" onChange={(e) => setConversionAmount(Number(e.target.value))} />
            <button id="btnSubmit" onClick={handleOnBtnConvertClick}>Convert</button>
            <input id="lblResult" type="text" placeholder="Converted amount in CAD will be shown here" value={conversionResult === -1 ? '' : conversionResult.toFixed(2)} disabled ></input>


        </div>
    </>)
}
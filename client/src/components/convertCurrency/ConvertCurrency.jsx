// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import './ConvertCurrency.css'
import * as Types from '../../utils/types'

/**
 * 
 * @param {Types.ConvertCurrencyProps} props 
 */
export default function ConvertCurrency(props) {

    const [conversionRate, setConversionRate] = useState(0);

    const handleConversionRateChange = (selectedConversionRate) => {
        setConversionRate(selectedConversionRate);
    };

    const handleOnBtnConvertClick = () => {
        alert("Convert button is clicked!")
    }

    return (<>
        <div className="divConvertCurrency">
            <select className="filter-category-button" onChange={(e) => handleConversionRateChange(e.target.value)}>
                <option value={0}>Select a currency ...</option>
                {props.available_currencies.map((currency) => (
                    <option key={currency.id} value={currency.conversionRate}>
                        {currency.currencyCode}
                    </option>
                ))}
            </select>
            <input type="number" />
            <button onClick={handleOnBtnConvertClick}>Convert</button>
            <input type="text" placeholder="Conversion result will be shown here!" disabled />
        </div>
    </>)
}
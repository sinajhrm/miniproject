import React, { useState } from 'react'
import * as Types from '../../utils/types'
import CountryService from "../../api/services/CountryService";

/**
 * 
 * @param {Types.AddCountryProps} props
 */
export default function AddCountry(props) {

    const [countryName, setCountryName] = useState('');

    function handleCountryNameChange(inputCountryName) {
        setCountryName(inputCountryName);
    }

    async function handleOnBtnAddCountry() {
        await CountryService.AddCountry({ name: countryName });
        props.countriesUpdateTrigger(true);
    }

    return (<>
        <div className="divAddCurrency">
            <div>
                <input name="countryName" type="text" placeholder="Country name ..." onChange={(e) => { handleCountryNameChange(e.target.value) }} />
            </div>
            <button onClick={handleOnBtnAddCountry}>Add Country</button>
        </div>
    </>)
}
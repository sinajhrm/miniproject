// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import * as Types from '../../utils/types'
import './DeleteCountry.css'
import CountryService from "../../api/services/CountryService";

/**
 * 
 * @param {Types.DeleteCountryProps} props 
 */
export default function DeleteCountry(props) {

    const [selectedCountryId, setSelectedCountryId] = useState(-1);

    const handleSelectedCountryIdChange = (chosenCountryId) => {
        setSelectedCountryId(Number(chosenCountryId));
    };

    async function handleOnBtnDelete() {
        if (selectedCountryId > 0) {
            await CountryService.delete(selectedCountryId);
            props.countriesUpdateTrigger(true);
        }
    }

    return (<>
        <div className="divDeleteCountry">
            <select onChange={(e) => handleSelectedCountryIdChange(e.target.value)} required>
                <option value={0}>Select a country ...</option>
                {props.available_countries.map((country) => (
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))}
            </select>
            <button onClick={handleOnBtnDelete}>Delete Country</button>
        </div>
    </>)
}

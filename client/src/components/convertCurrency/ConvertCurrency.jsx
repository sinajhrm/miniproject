// eslint-disable-next-line no-unused-vars
import React from "react";
import './ConvertCurrency.css'

export default function ConvertCurrency() {
    return (<>
        <div className="divConvertCurrency">
            <select>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
                <option>Option 5</option>
            </select>
            <input type="text" />
            <button>Convert</button>
            <input type="text" disabled />
        </div>
    </>)
}
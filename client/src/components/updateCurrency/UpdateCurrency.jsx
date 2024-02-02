// eslint-disable-next-line no-unused-vars
import React from "react";
import './UpdateCurrency.css'

export default function UpdateCurrency() {
    return (<>
        <div className="divUpdateCurrency">
            <select >
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
                <option>Option 5</option>
            </select>
            <input type="text" />
            <button>Update</button>
        </div>
    </>)
}
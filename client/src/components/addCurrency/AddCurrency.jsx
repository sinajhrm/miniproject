// eslint-disable-next-line no-unused-vars
import React from "react";
import './AddCurrency.css'

export default function AddCurrency() {
    return (<>
        <div className="divAddCurrency">
            <div>
                <input name="currency_code" type="text" placeholder="Currency Code" />
                <input placeholder="Conversion Rate" type="text" />
                <select>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                    <option>Option 4</option>
                    <option>Option 5</option>
                </select>
            </div>
            <button>Add Currency</button>
        </div>
    </>)
}
// eslint-disable-next-line no-unused-vars
import React from "react";
import './AddCurrency.css'

export default function AddCurrency() {
    return (<>
        <div className="divAddCurrency">
            <div>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
            </div>
            <button>Add Currency</button>
        </div>
    </>)
}
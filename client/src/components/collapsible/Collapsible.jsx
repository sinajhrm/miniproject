// This component is derived from the following source: https://medium.com/edonec/build-a-react-collapsible-component-from-scratch-using-react-hooks-typescript-73dfd02c9208

import React, { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMinus,
    faPlus
} from "@fortawesome/free-solid-svg-icons";

import * as Types from '../../utils/types.js'

import './Collapsible.css'

/** 
 * @param {Types.CollapsibleProps} props 
 */
function Collapsible(props) {
    const [isOpen, setIsOpen] = useState(props.open);
    const [height, setHeight] = useState(props.open ? undefined : 0);

    const ref = useRef(null);

    const handleFilterOpening = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        if (!height || !isOpen || !ref.current) return undefined;
        const resizeObserver = new ResizeObserver((el) => {
            setHeight(el[0].contentRect.height);
        });

        resizeObserver.observe(ref.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [height, isOpen, ref]);
    useEffect(() => {
        // console.log(ref);
        if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
        else setHeight(0);
    }, [isOpen, ref]);

    return (
        <>
            <div className="card">
                <div className="cardHeader" onClick={handleFilterOpening}>
                    <h6>{props.title}</h6>
                    <hr />
                    <span className="btn">
                        {!isOpen ? (
                            <FontAwesomeIcon icon={faPlus} />
                        ) : (
                            <FontAwesomeIcon icon={faMinus} />
                        )}
                    </span>
                </div>

                <div className="collapsible" style={{ height }}>
                    <div ref={ref}>{props.children}</div>
                </div>
            </div>
        </>
    );
}

export default Collapsible;
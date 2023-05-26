import React, { useState, useEffect, useRef } from 'react';
import styles from "./Dropdown.module.scss"
function Dropdown(props) {

    const [Position, setPosition] = useState({ top: 0, bottom: 0, left: 0, right: 0, });
    const [valueText, setValueText] = useState();
    const [isClick, setIsClick] = useState(false);
    const popRef = useRef()
    // console.log(popRef)
    const { Options, value, id, placeholder, onChange, dataDefault } = props;
    // console.log(props)

    const changeText = (e) =>{
        setValueText(e)
    }

    return (
        <div className={props.className ? "" : styles["Dropdown"]}
            id={styles["dropdown"]}
            style={{ ...props?.style ?? "" }}
            onClick={() => { setIsClick(!isClick) }}
            ref={popRef} >
            <div style={{position: "relative"}} className={styles["inputs_item", "stand_input"]} >
                <input className={styles["reset_input", "input_item"]} id={id ?? ""} name={props.name ?? ""} placeholder={placeholder ?? ""}
                    value={valueText ?? dataDefault}
                    autoComplete={("on").toString()} />
                <div className={isClick ? styles["is_change"] : styles["icon_float"]}>
                    <img src='images/downsearch.png' className='icon_' /></div>
            </div>
            <div className={isClick ? styles["show"] : styles["dropdown_body"]}>
                <ul>
                    {Options && Options.map((item, index) => {
                        // console.log(item)
                        return <li className={styles["stand_input"]} key={index} onClick={() => {changeText(item.text) ;onChange({target: {name: item.name, text: item.text, value: item.value}}) }} >{item.text}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}


export default Dropdown;
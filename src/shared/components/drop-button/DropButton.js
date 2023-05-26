import React, { useState, useEffect, useRef } from 'react';
import styles from "./DropButton.module.scss"
import AppActionHook from 'redux/supplier/action';
import { useDispatch } from 'react-redux';

function DropButton(props) {
    const dispatch = useDispatch()
    const { valuepr, table, statusValue, value, changeBackground } = props;
    // console.log(valuepr, 'valuepr')
    const [valueNumber, setValueNumber] = useState(valuepr)
    const [Status, setStatus] = useState(statusValue)
    useEffect(() => {

    })
    const onChangeButton = (e) => {
        console.log(e)
        table.status = e.value
        dispatch({

            type: AppActionHook.ADD_DATA,
            payload: {
                data: table
            }
        })
    }
    const [isClick, setIsClick] = useState(false);
    return (
        <div className={styles["button__status"]} onClick={() => { setIsClick(!isClick) }}>
            <div className={`${isClick ? styles["check__change"] : ""}`}>
                <button id={styles["button__change"]} style={{ ...props?.style ?? "" }} className={styles["button__role"]}>{value}
                    <img src="../../images/downbutton.png" alt="" />
                </button>
                <div className={styles["check__value"]}>
                    {Status && Status.map((item, index) => {
                        const sunT = valueNumber == 2 ? 1 : 2
                        if (item.value == sunT) {
                            return <ul>
                                <li key={item.value} onClick={() => { setValueNumber(sunT); onChangeButton(item) }}>{item.text}</li>
                            </ul>
                        }
                    })}
                </div>
            </div>
        </div>
    )
}


export default DropButton;
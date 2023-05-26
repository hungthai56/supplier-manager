import React from 'react';
import styles from "./CheckBox.module.scss"
function CheckBox(props) {
    const { value, onChange, id, style, checked, children } = props;
    return (
        <input className={styles["checkName"]} style={{ width: "20px", height: "20px" }} type="checkbox" id={id} value={value} onChange={(e) => onChange(e, value, true)} checked={checked} />
    )
}


export default CheckBox;
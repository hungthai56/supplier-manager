import React from 'react';
import styles from './InputType.module.scss';

function InputType(props) {

    const { value, onchange, type, id, classname, name, ref, checked, placeholder, validate, defaultValue } = props;

    if (validate) {
        return (
            <input {...validate} placeholder={placeholder} defaultValue={defaultValue} type={type} className={classname ?? ""} id={id}/>
        );
    } else {
        return (
            <input onChange={(e) => onchange(e) ?? ""} placeholder={placeholder} checked={checked} ref={ref} className={classname ?? ""} type={type} name={name} id={id} value={value ?? defaultValue}/>
        );
    }
   
}

export default InputType;